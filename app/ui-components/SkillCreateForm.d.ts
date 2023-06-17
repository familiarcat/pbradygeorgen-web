/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SkillCreateFormInputValues = {
    title?: string;
    link?: string;
    resumeID?: string;
    companyID?: string;
    accomplishmentID?: string;
};
export declare type SkillCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    resumeID?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    accomplishmentID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SkillCreateFormOverridesProps = {
    SkillCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    resumeID?: PrimitiveOverrideProps<AutocompleteProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    accomplishmentID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SkillCreateFormProps = React.PropsWithChildren<{
    overrides?: SkillCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SkillCreateFormInputValues) => SkillCreateFormInputValues;
    onSuccess?: (fields: SkillCreateFormInputValues) => void;
    onError?: (fields: SkillCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SkillCreateFormInputValues) => SkillCreateFormInputValues;
    onValidate?: SkillCreateFormValidationValues;
} & React.CSSProperties>;
export default function SkillCreateForm(props: SkillCreateFormProps): React.ReactElement;
