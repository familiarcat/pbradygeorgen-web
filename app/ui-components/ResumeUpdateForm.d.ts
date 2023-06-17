/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Resume, Summary as Summary0, Skill, Education as Education0, Experience as Experience0, ContactInformation as ContactInformation0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ResumeUpdateFormInputValues = {
    url?: string;
    image?: string;
    Summary?: Summary0;
    Skills?: Skill[];
    Education?: Education0;
    Experience?: Experience0;
    ContactInformation?: ContactInformation0;
};
export declare type ResumeUpdateFormValidationValues = {
    url?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    Summary?: ValidationFunction<Summary0>;
    Skills?: ValidationFunction<Skill>;
    Education?: ValidationFunction<Education0>;
    Experience?: ValidationFunction<Experience0>;
    ContactInformation?: ValidationFunction<ContactInformation0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResumeUpdateFormOverridesProps = {
    ResumeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    Summary?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
    Education?: PrimitiveOverrideProps<AutocompleteProps>;
    Experience?: PrimitiveOverrideProps<AutocompleteProps>;
    ContactInformation?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type ResumeUpdateFormProps = React.PropsWithChildren<{
    overrides?: ResumeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    resume?: Resume;
    onSubmit?: (fields: ResumeUpdateFormInputValues) => ResumeUpdateFormInputValues;
    onSuccess?: (fields: ResumeUpdateFormInputValues) => void;
    onError?: (fields: ResumeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeUpdateFormInputValues) => ResumeUpdateFormInputValues;
    onValidate?: ResumeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ResumeUpdateForm(props: ResumeUpdateFormProps): React.ReactElement;
