const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { sanitizeFilename } = require('@askargus/api');
const {
  mergeFileConfig,
  getEndpointFileConfig,
  fileConfig: defaultFileConfig,
} = require('askargus-data-provider');
const { getAppConfig } = require('~/server/services/Config');

const MAX_FILENAME_LENGTH = 255;
const JSON_MIME_TYPES = new Set(['application/json', 'text/json', 'application/ld+json']);
const SAFE_USER_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

function decodeOriginalName(originalname = '') {
  try {
    return decodeURIComponent(originalname);
  } catch {
    return originalname;
  }
}

function hasSafeFilename(originalname = '') {
  return (
    typeof originalname === 'string' &&
    originalname.length > 0 &&
    originalname.length <= MAX_FILENAME_LENGTH &&
    !originalname.includes('\x00')
  );
}

function isPathInside(parent, child) {
  const relativePath = path.relative(parent, child);
  return relativePath === '' || (!!relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const appConfig = req.config;
    const userId = req.user?.id;
    if (!SAFE_USER_ID_PATTERN.test(userId || '')) {
      return cb(new Error('Invalid upload user context'));
    }

    const tempRoot = path.resolve(appConfig.paths.uploads, 'temp');
    const outputPath = path.resolve(tempRoot, userId);
    if (!isPathInside(tempRoot, outputPath)) {
      return cb(new Error('Invalid upload destination'));
    }

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    cb(null, outputPath);
  },
  filename: function (req, file, cb) {
    req.file_id = crypto.randomUUID();
    const decodedName = path.basename(decodeOriginalName(file.originalname));
    if (!hasSafeFilename(decodedName)) {
      return cb(new Error('Invalid filename'));
    }

    file.originalname = decodedName;
    const sanitizedFilename = sanitizeFilename(decodedName);
    if (!hasSafeFilename(sanitizedFilename)) {
      return cb(new Error('Invalid sanitized filename'));
    }

    cb(null, sanitizedFilename);
  },
});

const importFileFilter = (req, file, cb) => {
  const originalname = decodeOriginalName(file?.originalname);
  if (!hasSafeFilename(originalname)) {
    return cb(new Error('Invalid filename'), false);
  }

  const extension = path.extname(path.basename(originalname)).toLowerCase();
  if (extension !== '.json' || !JSON_MIME_TYPES.has(file.mimetype)) {
    return cb(new Error('Only JSON files are allowed'), false);
  }

  cb(null, true);
};

/**
 *
 * @param {import('askargus-data-provider').FileConfig | undefined} customFileConfig
 */
const createFileFilter = (customFileConfig) => {
  /**
   * @param {ServerRequest} req
   * @param {Express.Multer.File}
   * @param {import('multer').FileFilterCallback} cb
   */
  const fileFilter = (req, file, cb) => {
    if (!file) {
      return cb(new Error('No file provided'), false);
    }

    const originalname = decodeOriginalName(file.originalname);
    if (!hasSafeFilename(originalname)) {
      return cb(new Error('Invalid filename'), false);
    }

    if (req.originalUrl.endsWith('/speech/stt') && file.mimetype?.startsWith('audio/')) {
      return cb(null, true);
    }

    const endpoint = req.body.endpoint;
    const endpointType = req.body.endpointType;
    const endpointFileConfig = getEndpointFileConfig({
      fileConfig: customFileConfig,
      endpoint,
      endpointType,
    });

    if (
      !file.mimetype ||
      !defaultFileConfig.checkType(file.mimetype, endpointFileConfig.supportedMimeTypes)
    ) {
      return cb(new Error('Unsupported file type: ' + file.mimetype), false);
    }

    cb(null, true);
  };

  return fileFilter;
};

const createMulterInstance = async () => {
  const appConfig = await getAppConfig();
  const fileConfig = mergeFileConfig(appConfig?.fileConfig);
  const fileFilter = createFileFilter(fileConfig);
  return multer({
    storage,
    fileFilter,
    limits: { fileSize: fileConfig.serverFileSizeLimit },
  });
};

module.exports = { createMulterInstance, storage, importFileFilter };
