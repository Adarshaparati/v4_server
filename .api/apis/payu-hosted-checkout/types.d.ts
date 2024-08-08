import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type VerifypaymentFormDataParam = FromSchema<typeof schemas.Verifypayment.formData>;
export type VerifypaymentMetadataParam = FromSchema<typeof schemas.Verifypayment.metadata>;
export type VerifypaymentResponse200 = FromSchema<typeof schemas.Verifypayment.response['200']>;
