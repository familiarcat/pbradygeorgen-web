/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Skill } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SkillUpdateFormInputValues = {
    title?: string;
    link?: string;
    resumeID?: string;
    companyID?: string;
    accomplishmentID?: string;
};
export declare type SkillUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    resumeID?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    accomplishmentID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SkillUpdateFormOverridesProps = {
    SkillUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    resumeID?: PrimitiveOverrideProps<AutocompleteProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    accomplishmentID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SkillUpdateFormProps = React.PropsWithChildren<{
    overrides?: SkillUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    skill?: Skill;
    onSubmit?: (fields: SkillUpdateFormInputValues) => SkillUpdateFormInputValues;
    onSuccess?: (fields: SkillUpdateFormInputValues) => void;
    onError?: (fields: SkillUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SkillUpdateFormInputValues) => SkillUpdateFormInputValues;
    onValidate?: SkillUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SkillUpdateForm(props: SkillUpdateFormProps): React.ReactElement;
