# Data Dictionary

Generated at `2026-04-13T00:59:50Z`.

## es_journal_log

Elasticsearch index `journal-log` modeled as a relational table for documentation. Dynamic fields may exist beyond this mapping. Generated at 2026-04-13T00:59:50Z. Example fields from a sample doc: {"msg_type": "ordupd", "UserId": "CS31355316", "AcctId": "CS31355316", "TradingSymbol": "NIFTY24MAR26P22900", "@timestamp": "2026-03-24T09:43:41.000Z"}.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `es_doc_id` | `varchar` | NO | PK | Elasticsearch document `_id`. |
| `_timestamp` | `timestamp` | YES |  | Event timestamp. |
| `AccessType` | `text` | YES |  | Elasticsearch field `AccessType` (type `text`). |
| `AcctId` | `text` | YES |  | Account/user identifier. |
| `AddlSrcInfoes` | `text` | YES |  | Elasticsearch field `AddlSrcInfoes` (type `text`). |
| `AlgoId` | `text` | YES |  | Elasticsearch field `AlgoId` (type `text`). |
| `Amo` | `boolean` | YES |  | Elasticsearch field `Amo` (type `boolean`). |
| `BasketOrderId` | `bigint` | YES |  | Elasticsearch field `BasketOrderId` (type `long`). |
| `BrokerId` | `text` | YES |  | Elasticsearch field `BrokerId` (type `text`). |
| `CancelledQty` | `bigint` | YES |  | Elasticsearch field `CancelledQty` (type `long`). |
| `CancelledQtyLeg2` | `bigint` | YES |  | Elasticsearch field `CancelledQtyLeg2` (type `long`). |
| `ClOrdId` | `text` | YES |  | Elasticsearch field `ClOrdId` (type `text`). |
| `CustFirm` | `text` | YES |  | Elasticsearch field `CustFirm` (type `text`). |
| `DevicePinFlag` | `boolean` | YES |  | Elasticsearch field `DevicePinFlag` (type `boolean`). |
| `DiscQty` | `bigint` | YES |  | Order quantity value. |
| `Eref` | `bigint` | YES |  | Elasticsearch field `Eref` (type `long`). |
| `ExchNsecs` | `bigint` | YES |  | Elasticsearch field `ExchNsecs` (type `long`). |
| `ExchOrdNum` | `text` | YES |  | Elasticsearch field `ExchOrdNum` (type `text`). |
| `ExchSeg` | `text` | YES |  | Exchange / segment identifier. |
| `ExchSegAcctId` | `text` | YES |  | Elasticsearch field `ExchSegAcctId` (type `text`). |
| `ExchSeqNum` | `bigint` | YES |  | Elasticsearch field `ExchSeqNum` (type `long`). |
| `ExchSeqNumS` | `text` | YES |  | Elasticsearch field `ExchSeqNumS` (type `text`). |
| `ExchTimeStamp` | `bigint` | YES |  | Elasticsearch field `ExchTimeStamp` (type `long`). |
| `ExchUserId` | `text` | YES |  | Elasticsearch field `ExchUserId` (type `text`). |
| `ExchUserInfo` | `text` | YES |  | Elasticsearch field `ExchUserInfo` (type `text`). |
| `FamilyId` | `text` | YES |  | Elasticsearch field `FamilyId` (type `text`). |
| `FillAvgPrice` | `bigint` | YES |  | Elasticsearch field `FillAvgPrice` (type `long`). |
| `FillAvgPriceLeg2` | `bigint` | YES |  | Elasticsearch field `FillAvgPriceLeg2` (type `long`). |
| `FillId` | `text` | YES |  | Elasticsearch field `FillId` (type `text`). |
| `FillLeg` | `bigint` | YES |  | Elasticsearch field `FillLeg` (type `long`). |
| `FillPrice` | `bigint` | YES |  | Elasticsearch field `FillPrice` (type `long`). |
| `FillQty` | `bigint` | YES |  | Elasticsearch field `FillQty` (type `long`). |
| `FillTime` | `text` | YES |  | Elasticsearch field `FillTime` (type `text`). |
| `FixRemarks` | `text` | YES |  | Elasticsearch field `FixRemarks` (type `text`). |
| `GuiStatus` | `bigint` | YES |  | Order status code (exchange/broker specific). |
| `InteropExchSeg` | `text` | YES |  | Elasticsearch field `InteropExchSeg` (type `text`). |
| `InteropKey` | `text` | YES |  | Elasticsearch field `InteropKey` (type `text`). |
| `IpAddr` | `text` | YES |  | Elasticsearch field `IpAddr` (type `text`). |
| `LastAttemptCount` | `bigint` | YES |  | Elasticsearch field `LastAttemptCount` (type `long`). |
| `LocId` | `bigint` | YES |  | Elasticsearch field `LocId` (type `long`). |
| `LoginProcId` | `text` | YES |  | Elasticsearch field `LoginProcId` (type `text`). |
| `MinRedemFlag` | `boolean` | YES |  | Elasticsearch field `MinRedemFlag` (type `boolean`). |
| `MktProtection` | `float` | YES |  | Elasticsearch field `MktProtection` (type `float`). |
| `Msg` | `text` | YES |  | Elasticsearch field `Msg` (type `text`). |
| `NorenKidId` | `bigint` | YES |  | Elasticsearch field `NorenKidId` (type `long`). |
| `NorenNsecs` | `bigint` | YES |  | Elasticsearch field `NorenNsecs` (type `long`). |
| `NorenOrdNum` | `bigint` | YES |  | Elasticsearch field `NorenOrdNum` (type `long`). |
| `NorenOrgNsecs` | `bigint` | YES |  | Elasticsearch field `NorenOrgNsecs` (type `long`). |
| `NorenOrgTimeStamp` | `bigint` | YES |  | Elasticsearch field `NorenOrgTimeStamp` (type `long`). |
| `NorenTimeStamp` | `bigint` | YES |  | Elasticsearch field `NorenTimeStamp` (type `long`). |
| `OrdDuration` | `text` | YES |  | Elasticsearch field `OrdDuration` (type `text`). |
| `OrdRemarks` | `text` | YES |  | Elasticsearch field `OrdRemarks` (type `text`). |
| `OrdSrc` | `text` | YES |  | Elasticsearch field `OrdSrc` (type `text`). |
| `OrdStatus` | `bigint` | YES |  | Order status code (exchange/broker specific). |
| `OrgClOrdId` | `text` | YES |  | Elasticsearch field `OrgClOrdId` (type `text`). |
| `OrgExchTime` | `text` | YES |  | Elasticsearch field `OrgExchTime` (type `text`). |
| `OrgOrdSrc` | `text` | YES |  | Elasticsearch field `OrgOrdSrc` (type `text`). |
| `PanNum` | `text` | YES |  | Elasticsearch field `PanNum` (type `text`). |
| `ParticId` | `text` | YES |  | Elasticsearch field `ParticId` (type `text`). |
| `PriceToFill` | `bigint` | YES |  | Order price value. |
| `PriceToFillLeg2` | `bigint` | YES |  | Elasticsearch field `PriceToFillLeg2` (type `long`). |
| `PriceType` | `text` | YES |  | Elasticsearch field `PriceType` (type `text`). |
| `Product` | `text` | YES |  | Elasticsearch field `Product` (type `text`). |
| `QtyToFill` | `bigint` | YES |  | Order quantity value. |
| `QtyToFillLeg2` | `bigint` | YES |  | Elasticsearch field `QtyToFillLeg2` (type `long`). |
| `RedCheck` | `boolean` | YES |  | Elasticsearch field `RedCheck` (type `boolean`). |
| `RedOrgPrice` | `bigint` | YES |  | Elasticsearch field `RedOrgPrice` (type `long`). |
| `RedOrgPriceLeg2` | `bigint` | YES |  | Elasticsearch field `RedOrgPriceLeg2` (type `long`). |
| `RedOrgQty` | `bigint` | YES |  | Elasticsearch field `RedOrgQty` (type `long`). |
| `RedOrgQtyLeg2` | `bigint` | YES |  | Elasticsearch field `RedOrgQtyLeg2` (type `long`). |
| `RedOrgTriggerPrice` | `bigint` | YES |  | Elasticsearch field `RedOrgTriggerPrice` (type `long`). |
| `RedPrice` | `bigint` | YES |  | Elasticsearch field `RedPrice` (type `long`). |
| `RedPriceLeg2` | `bigint` | YES |  | Elasticsearch field `RedPriceLeg2` (type `long`). |
| `RedQty` | `bigint` | YES |  | Elasticsearch field `RedQty` (type `long`). |
| `RedQtyLeg2` | `bigint` | YES |  | Elasticsearch field `RedQtyLeg2` (type `long`). |
| `RedSuperUser` | `boolean` | YES |  | Elasticsearch field `RedSuperUser` (type `boolean`). |
| `RedTriggerPrice` | `bigint` | YES |  | Elasticsearch field `RedTriggerPrice` (type `long`). |
| `Region` | `text` | YES |  | Elasticsearch field `Region` (type `text`). |
| `RejBy` | `text` | YES |  | Elasticsearch field `RejBy` (type `text`). |
| `RejOrdSrc` | `text` | YES |  | Elasticsearch field `RejOrdSrc` (type `text`). |
| `RejPriceType` | `text` | YES |  | Elasticsearch field `RejPriceType` (type `text`). |
| `RejQty` | `bigint` | YES |  | Elasticsearch field `RejQty` (type `long`). |
| `RejReason` | `text` | YES |  | Elasticsearch field `RejReason` (type `text`). |
| `ReportType` | `bigint` | YES |  | Order status code (exchange/broker specific). |
| `ReqStatus` | `text` | YES |  | Elasticsearch field `ReqStatus` (type `text`). |
| `Scripupdate_json` | `json` | YES |  | Raw JSON for `Scripupdate` subdocument. |
| `ScripupdateSpread_json` | `json` | YES |  | Raw JSON for `ScripupdateSpread` subdocument. |
| `Seqno` | `bigint` | YES |  | Elasticsearch field `Seqno` (type `long`). |
| `SpreadToken` | `text` | YES |  | Elasticsearch field `SpreadToken` (type `text`). |
| `SpreadTradingSymbol` | `text` | YES |  | Elasticsearch field `SpreadTradingSymbol` (type `text`). |
| `SrcUserId` | `text` | YES |  | Elasticsearch field `SrcUserId` (type `text`). |
| `StreamId` | `text` | YES |  | Elasticsearch field `StreamId` (type `text`). |
| `TimeStamps_json` | `json` | YES |  | Raw JSON for `TimeStamps` subdocument. |
| `Token` | `text` | YES |  | Trading instrument identifier/symbol. |
| `TokenLeg2` | `text` | YES |  | Elasticsearch field `TokenLeg2` (type `text`). |
| `TotalFillQty` | `bigint` | YES |  | Elasticsearch field `TotalFillQty` (type `long`). |
| `TotalFillQtyLeg2` | `bigint` | YES |  | Elasticsearch field `TotalFillQtyLeg2` (type `long`). |
| `TradingSymbol` | `text` | YES |  | Trading instrument identifier/symbol. |
| `TradingSymbolLeg2` | `text` | YES |  | Elasticsearch field `TradingSymbolLeg2` (type `text`). |
| `TransType` | `text` | YES |  | Transaction side (e.g., buy/sell). |
| `TransTypeLeg2` | `text` | YES |  | Elasticsearch field `TransTypeLeg2` (type `text`). |
| `TriggerPrice` | `bigint` | YES |  | Elasticsearch field `TriggerPrice` (type `long`). |
| `UiDevCode` | `text` | YES |  | Elasticsearch field `UiDevCode` (type `text`). |
| `UserId` | `text` | YES |  | Account/user identifier. |
| `UserPrivilege` | `bigint` | YES |  | Elasticsearch field `UserPrivilege` (type `long`). |
| `UserSessId` | `text` | YES |  | Elasticsearch field `UserSessId` (type `text`). |
| `Userdetails_json` | `json` | YES |  | Raw JSON for `Userdetails` subdocument. |
| `ingested_at` | `timestamp` | YES |  | Event timestamp. |
| `msg_seq` | `bigint` | YES |  | Elasticsearch field `msg_seq` (type `long`). |
| `msg_type` | `text` | YES |  | Elasticsearch field `msg_type` (type `text`). |
| `scripupdateLEG2_json` | `json` | YES |  | Raw JSON for `scripupdateLEG2` subdocument. |
| `source_file` | `varchar` | YES |  | Ingestion file provenance. |
| `source_path` | `varchar` | YES |  | Ingestion file provenance. |
| `es_source_json` | `json` | YES |  | Raw Elasticsearch `_source` JSON snapshot (documentation aid). |

## es_journal_log__Scripupdate

1:1 subdocument table for `journal-log.Scripupdate`.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `es_doc_id` | `varchar` | NO | PK | FK to parent document. (References `es_journal_log.es_doc_id`.) |
| `ConProdId` | `text` | YES |  | Elasticsearch field `Scripupdate.ConProdId` (type `text`). |
| `ExchExpiryDate` | `bigint` | YES |  | Elasticsearch field `Scripupdate.ExchExpiryDate` (type `long`). |
| `Exchange` | `text` | YES |  | Exchange / segment identifier. |
| `ExpiryDate` | `text` | YES |  | Elasticsearch field `Scripupdate.ExpiryDate` (type `text`). |
| `GsmInd` | `bigint` | YES |  | Elasticsearch field `Scripupdate.GsmInd` (type `long`). |
| `InstrumentName` | `text` | YES |  | Elasticsearch field `Scripupdate.InstrumentName` (type `text`). |
| `InteropExchSeg` | `text` | YES |  | Elasticsearch field `Scripupdate.InteropExchSeg` (type `text`). |
| `InteropKey` | `text` | YES |  | Elasticsearch field `Scripupdate.InteropKey` (type `text`). |
| `LotSize` | `bigint` | YES |  | Elasticsearch field `Scripupdate.LotSize` (type `long`). |
| `OptionType` | `text` | YES |  | Elasticsearch field `Scripupdate.OptionType` (type `text`). |
| `PricePrecision` | `bigint` | YES |  | Elasticsearch field `Scripupdate.PricePrecision` (type `long`). |
| `RedExpiryDate` | `text` | YES |  | Elasticsearch field `Scripupdate.RedExpiryDate` (type `text`). |
| `Segment` | `text` | YES |  | Exchange / segment identifier. |
| `StrikePrice` | `bigint` | YES |  | Elasticsearch field `Scripupdate.StrikePrice` (type `long`). |
| `SymbolName` | `text` | YES |  | Elasticsearch field `Scripupdate.SymbolName` (type `text`). |
| `TickSize` | `bigint` | YES |  | Elasticsearch field `Scripupdate.TickSize` (type `long`). |
| `TradingSymbol` | `text` | YES |  | Trading instrument identifier/symbol. |
| `subdoc_json` | `json` | YES |  | Raw JSON for `Scripupdate` object (documentation aid). |

## es_journal_log__ScripupdateSpread

1:1 subdocument table for `journal-log.ScripupdateSpread`.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `es_doc_id` | `varchar` | NO | PK | FK to parent document. (References `es_journal_log.es_doc_id`.) |
| `ExchExpiryDate` | `bigint` | YES |  | Elasticsearch field `ScripupdateSpread.ExchExpiryDate` (type `long`). |
| `Exchange` | `text` | YES |  | Exchange / segment identifier. |
| `ExpiryDate` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.ExpiryDate` (type `text`). |
| `InstrumentName` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.InstrumentName` (type `text`). |
| `LotSize` | `bigint` | YES |  | Elasticsearch field `ScripupdateSpread.LotSize` (type `long`). |
| `OptionType` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.OptionType` (type `text`). |
| `RedExpiryDate` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.RedExpiryDate` (type `text`). |
| `Segment` | `text` | YES |  | Exchange / segment identifier. |
| `SpreadTradingSymbolLeg1` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.SpreadTradingSymbolLeg1` (type `text`). |
| `SpreadTradingSymbolLeg2` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.SpreadTradingSymbolLeg2` (type `text`). |
| `StrikePrice` | `bigint` | YES |  | Elasticsearch field `ScripupdateSpread.StrikePrice` (type `long`). |
| `SymbolName` | `text` | YES |  | Elasticsearch field `ScripupdateSpread.SymbolName` (type `text`). |
| `TickSize` | `bigint` | YES |  | Elasticsearch field `ScripupdateSpread.TickSize` (type `long`). |
| `TradingSymbol` | `text` | YES |  | Trading instrument identifier/symbol. |
| `subdoc_json` | `json` | YES |  | Raw JSON for `ScripupdateSpread` object (documentation aid). |

## es_journal_log__TimeStamps

1:1 subdocument table for `journal-log.TimeStamps`.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `es_doc_id` | `varchar` | NO | PK | FK to parent document. (References `es_journal_log.es_doc_id`.) |
| `NorenOraIn` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenOraIn` (type `long`). |
| `NorenOraInNsecs` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenOraInNsecs` (type `long`). |
| `NorenOraOut` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenOraOut` (type `long`). |
| `NorenOraOutNsecs` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenOraOutNsecs` (type `long`). |
| `NorenRedIn` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenRedIn` (type `long`). |
| `NorenRedInNsecs` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenRedInNsecs` (type `long`). |
| `NorenRedOut` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenRedOut` (type `long`). |
| `NorenRedOutNsecs` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenRedOutNsecs` (type `long`). |
| `NorenSafIn` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenSafIn` (type `long`). |
| `NorenSafInNsecs` | `bigint` | YES |  | Elasticsearch field `TimeStamps.NorenSafInNsecs` (type `long`). |
| `subdoc_json` | `json` | YES |  | Raw JSON for `TimeStamps` object (documentation aid). |

## es_journal_log__Userdetails

1:1 subdocument table for `journal-log.Userdetails`.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `es_doc_id` | `varchar` | NO | PK | FK to parent document. (References `es_journal_log.es_doc_id`.) |
| `AcctIds` | `text` | YES |  | Elasticsearch field `Userdetails.AcctIds` (type `text`). |
| `AcctOverview` | `boolean` | YES |  | Elasticsearch field `Userdetails.AcctOverview` (type `boolean`). |
| `BrokerId` | `text` | YES |  | Elasticsearch field `Userdetails.BrokerId` (type `text`). |
| `DisplayPrecision` | `bigint` | YES |  | Elasticsearch field `Userdetails.DisplayPrecision` (type `long`). |
| `Dob` | `text` | YES |  | Elasticsearch field `Userdetails.Dob` (type `text`). |
| `EmailId` | `text` | YES |  | Elasticsearch field `Userdetails.EmailId` (type `text`). |
| `LastAttemptCount` | `bigint` | YES |  | Elasticsearch field `Userdetails.LastAttemptCount` (type `long`). |
| `LastLoginIp` | `text` | YES |  | Elasticsearch field `Userdetails.LastLoginIp` (type `text`). |
| `LastLoginMac` | `text` | YES |  | Elasticsearch field `Userdetails.LastLoginMac` (type `text`). |
| `LastLoginTime` | `bigint` | YES |  | Elasticsearch field `Userdetails.LastLoginTime` (type `long`). |
| `LastPasswordTime` | `bigint` | YES |  | Elasticsearch field `Userdetails.LastPasswordTime` (type `long`). |
| `MaxContractSub` | `bigint` | YES |  | Elasticsearch field `Userdetails.MaxContractSub` (type `long`). |
| `MobNum` | `bigint` | YES |  | Elasticsearch field `Userdetails.MobNum` (type `long`). |
| `NorenAppVersion` | `text` | YES |  | Elasticsearch field `Userdetails.NorenAppVersion` (type `text`). |
| `PasswordReset` | `boolean` | YES |  | Elasticsearch field `Userdetails.PasswordReset` (type `boolean`). |
| `Products` | `text` | YES |  | Elasticsearch field `Userdetails.Products` (type `text`). |
| `PropOrdFlag` | `boolean` | YES |  | Elasticsearch field `Userdetails.PropOrdFlag` (type `boolean`). |
| `RedSuperUser` | `boolean` | YES |  | Elasticsearch field `Userdetails.RedSuperUser` (type `boolean`). |
| `Region` | `text` | YES |  | Elasticsearch field `Userdetails.Region` (type `text`). |
| `UserAccessGrp` | `text` | YES |  | Elasticsearch field `Userdetails.UserAccessGrp` (type `text`). |
| `UserExchDetails` | `json` | YES |  | Elasticsearch object field `Userdetails.UserExchDetails`. |
| `UserId` | `text` | YES |  | Account/user identifier. |
| `UserIpAddr` | `text` | YES |  | Elasticsearch field `Userdetails.UserIpAddr` (type `text`). |
| `UserMacAddr` | `text` | YES |  | Elasticsearch field `Userdetails.UserMacAddr` (type `text`). |
| `UserName` | `text` | YES |  | Elasticsearch field `Userdetails.UserName` (type `text`). |
| `UserOrdTypes` | `text` | YES |  | Elasticsearch field `Userdetails.UserOrdTypes` (type `text`). |
| `UserPrivilege` | `bigint` | YES |  | Elasticsearch field `Userdetails.UserPrivilege` (type `long`). |
| `UserSessId` | `text` | YES |  | Elasticsearch field `Userdetails.UserSessId` (type `text`). |
| `UserSessOtp` | `text` | YES |  | Elasticsearch field `Userdetails.UserSessOtp` (type `text`). |
| `UserTag` | `text` | YES |  | Elasticsearch field `Userdetails.UserTag` (type `text`). |
| `subdoc_json` | `json` | YES |  | Raw JSON for `Userdetails` object (documentation aid). |

## es_journal_log__scripupdateLEG2

1:1 subdocument table for `journal-log.scripupdateLEG2`.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `es_doc_id` | `varchar` | NO | PK | FK to parent document. (References `es_journal_log.es_doc_id`.) |
| `ExchExpiryDate` | `bigint` | YES |  | Elasticsearch field `scripupdateLEG2.ExchExpiryDate` (type `long`). |
| `Exchange` | `text` | YES |  | Exchange / segment identifier. |
| `ExpiryDate` | `text` | YES |  | Elasticsearch field `scripupdateLEG2.ExpiryDate` (type `text`). |
| `InstrumentName` | `text` | YES |  | Elasticsearch field `scripupdateLEG2.InstrumentName` (type `text`). |
| `LotSize` | `bigint` | YES |  | Elasticsearch field `scripupdateLEG2.LotSize` (type `long`). |
| `OptionType` | `text` | YES |  | Elasticsearch field `scripupdateLEG2.OptionType` (type `text`). |
| `RedExpiryDate` | `text` | YES |  | Elasticsearch field `scripupdateLEG2.RedExpiryDate` (type `text`). |
| `Segment` | `text` | YES |  | Exchange / segment identifier. |
| `StrikePrice` | `bigint` | YES |  | Elasticsearch field `scripupdateLEG2.StrikePrice` (type `long`). |
| `SymbolName` | `text` | YES |  | Elasticsearch field `scripupdateLEG2.SymbolName` (type `text`). |
| `TickSize` | `bigint` | YES |  | Elasticsearch field `scripupdateLEG2.TickSize` (type `long`). |
| `TradingSymbol` | `text` | YES |  | Trading instrument identifier/symbol. |
| `subdoc_json` | `json` | YES |  | Raw JSON for `scripupdateLEG2` object (documentation aid). |

## prometheus_metric

Metric definitions and metadata as exposed by Prometheus. (Logical model for documentation.)

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `metric_name` | `varchar` | NO | PK | Metric name. |
| `type` | `varchar` | YES |  | Metric type (counter, gauge, histogram, summary, untyped). |
| `help` | `text` | YES |  | Metric help/description. |
| `unit` | `varchar` | YES |  | Metric unit if available. |

## prometheus_series

Distinct time series = metric + labelset. Label keys/values are dynamic per metric.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `series_id` | `varchar` | NO | PK | Synthetic identifier. |
| `metric_name` | `varchar` | NO | FK | FK to metric. (References `prometheus_metric.metric_name`.) |
| `labels_json` | `json` | YES |  | All labels for the series as JSON. |

## prometheus_sample

Samples for a time series. Stored as timestamped float values.

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `series_id` | `varchar` | NO | FK | FK to series. (References `prometheus_series.series_id`.) |
| `ts` | `timestamp` | NO |  | Sample timestamp (UTC). |
| `value` | `double` | NO |  | Sample value. |

## prometheus_target

Scrape targets as reported by Prometheus (active/discovered targets).

| Column | Type | Nullable | Key | Description |
|---|---|---|---|---|
| `target_id` | `varchar` | NO | PK | Synthetic identifier. |
| `job` | `varchar` | YES |  | Scrape job name. |
| `instance` | `varchar` | YES |  | Target instance label (host:port). |
| `scrape_url` | `varchar` | YES |  | Scrape URL. |
| `health` | `varchar` | YES |  | Target health (up/down/unknown). |
| `last_scrape` | `timestamp` | YES |  | Last scrape timestamp. |
| `labels_json` | `json` | YES |  | All discovered labels as JSON. |
