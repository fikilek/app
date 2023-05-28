import { fsAstData } from "./fsAstData";
import { fsTrnData } from "./fsTrnData";
import { fsValidationData } from "./fsValidationData";

import MeterCommissioningJsx from "./jsx/meter/MeterCommissioningJsx";
import MeterInstallationJsx from "./jsx/meter/MeterInstallationJsx";
import MeterAuditJsx from "./jsx/meter/MeterAuditJsx";

import CbInstallationJsx from "./jsx/cb/CbInstallationJsx";
import CbCommissioningJsx from "./jsx/cb/CbCommissioningJsx";
import CbAuditJsx from "./jsx/cb/CbAuditJsx";

import SealInstallationJsx from "./jsx/seal/SealInstallationJsx";
import SealCommissioningJsx from "./jsx/seal/SealCommissioningJsx";
import SealAuditJsx from "./jsx/seal/SealAuditJsx";

import BoxInstallationJsx from "./jsx/box/BoxInstallationJsx";
import BoxCommissioningJsx from "./jsx/box/BoxCommissioningJsx";
import BoxAuditJsx from "./jsx/box/BoxAuditJsx";

import PoleInstallationJsx from "./jsx/pole/PoleInstallationJsx";
import PoleCommissioningJsx from "./jsx/pole/PoleCommissioningJsx";
import PoleAuditJsx from "./jsx/pole/PoleAuditJsx";

export const formSects = {
	meter: {
		installation: {
			trnData: fsTrnData.meter.installationData,
			trnValidationData: fsValidationData.meter.installationValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.meter.commissioningData,
			trnValidationData: fsValidationData.meter.commissioningValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.meter.astData, //po or stores data
			trnData: fsTrnData.meter.auditData,
			trnValidationData: fsValidationData.meter.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	cb: {
		installation: {
			trnData: fsTrnData.cb.installationData,
			trnValidationData: fsValidationData.cb.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.cb.commissioningData,
			trnValidationData: fsValidationData.cb.commissioningValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.cb.astData, //po or stores data
			trnData: fsTrnData.cb.auditData,
			trnValidationData: fsValidationData.cb.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	seal: {
		installation: {
			trnData: fsTrnData.seal.installationData,
			trnValidationData: fsValidationData.seal.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.seal.commissioningData,
			trnValidationData: fsValidationData.seal.commissioningValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.seal.astData,
			trnData: fsTrnData.seal.auditData,
			trnValidationData: fsValidationData.seal.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	box: {
		installation: {
			trnData: fsTrnData.box.installationData,
			trnValidationData: fsValidationData.box.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.box.commissioningData,
			trnValidationData: fsValidationData.box.commissioningValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.box.astData, //po or stores data
			trnData: fsTrnData.box.auditData,
			trnValidationData: fsValidationData.box.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	pole: {
		installation: {
			trnData: fsTrnData.pole.installationData,
			trnValidationData: fsValidationData.pole.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.pole.commissioningData,
			trnValidationData: fsValidationData.pole.commissioningValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.pole.astData, //po or stores data
			trnData: fsTrnData.pole.auditData,
			trnValidationData: fsValidationData.pole.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},
};
