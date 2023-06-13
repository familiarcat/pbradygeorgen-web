/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Company, Engagement, Accomplishment } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CompanyUpdateFormInputValues = {
    title?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    historyID?: string;
    Engagements?: Engagement[];
    Accomplishments?: Accomplishment[];
};
export declare type CompanyUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    historyID?: ValidationFunction<string>;
    Engagements?: ValidationFunction<Engagement>;
    Accomplishments?: ValidationFunction<Accomplishment>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CompanyUpdateFormOverridesProps = {
    CompanyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    historyID?: PrimitiveOverrideProps<AutocompleteProps>;
    Engagements?: PrimitiveOverrideProps<AutocompleteProps>;
    Accomplishments?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CompanyUpdateFormProps = React.PropsWithChildren<{
    overrides?: CompanyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    company?: Company;
    onSubmit?: (fields: CompanyUpdateFormInputValues) => CompanyUpdateFormInputValues;
    onSuccess?: (fields: CompanyUpdateFormInputValues) => void;
    onError?: (fields: CompanyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CompanyUpdateFormInputValues) => CompanyUpdateFormInputValues;
    onValidate?: CompanyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CompanyUpdateForm(props: CompanyUpdateFormProps): React.ReactElement;
