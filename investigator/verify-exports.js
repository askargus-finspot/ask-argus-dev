#!/usr/bin/env node

/**
 * Verification script to ensure all exports from @askargus/investigator are working correctly
 */

console.log('🔍 Verifying @askargus/investigator exports...\n');

try {
  // Import the package
  const pkg = require('./dist/index.js');

  const expectedExports = [
    'buildInvestigator',
    'DOMAINS',
    'DOMAIN_NAMES',
    'InvestigationAnnotation',
    'executePlan',
    'Schemas',
    'bootstrapClients',
    'bootstrapPartialClients',
    'DomainNameSchema',
    'QueryLanguageSchema',
    'ConfidenceSchema',
    'TimeRangeSchema',
    'QueryPlanSchema',
    'QueryResultSchema',
    'FindingSchema',
    'InvestigationReportSchema',
  ];

  let allPassed = true;

  console.log('Checking exports:\n');

  for (const exportName of expectedExports) {
    const exists = exportName in pkg;
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${exportName}`);
    
    if (!exists) {
      allPassed = false;
    }
  }

  console.log('\n---\n');

  // Check DOMAIN_NAMES
  if (pkg.DOMAIN_NAMES && Array.isArray(pkg.DOMAIN_NAMES)) {
    console.log(`✅ DOMAIN_NAMES is an array with ${pkg.DOMAIN_NAMES.length} domains`);
    console.log(`   Domains: ${pkg.DOMAIN_NAMES.join(', ')}`);
  } else {
    console.log('❌ DOMAIN_NAMES is not an array');
    allPassed = false;
  }

  // Check DOMAINS
  if (pkg.DOMAINS && typeof pkg.DOMAINS === 'object') {
    const domainCount = Object.keys(pkg.DOMAINS).length;
    console.log(`✅ DOMAINS is an object with ${domainCount} domain configs`);
  } else {
    console.log('❌ DOMAINS is not an object');
    allPassed = false;
  }

  // Check Schemas namespace
  if (pkg.Schemas && typeof pkg.Schemas === 'object') {
    const schemaCount = Object.keys(pkg.Schemas).length;
    console.log(`✅ Schemas namespace exists with ${schemaCount} schemas`);
  } else {
    console.log('❌ Schemas namespace is missing');
    allPassed = false;
  }

  console.log('\n---\n');

  if (allPassed) {
    console.log('✅ All exports verified successfully!\n');
    process.exit(0);
  } else {
    console.log('❌ Some exports are missing or incorrect\n');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Failed to load package:', error.message);
  console.error('\nMake sure to build the package first:');
  console.error('  npm run build\n');
  process.exit(1);
}
