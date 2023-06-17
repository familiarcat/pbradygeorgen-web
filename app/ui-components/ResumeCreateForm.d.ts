/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Summary as Summary0, Skill, Education as Education0, Experience as Experience0, ContactInformation as ContactInformation0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ResumeCreateFormInputValues = {
    url?: string;
    image?: string;
    Summary?: Summary0;
    Skills?: Skill[];
    Education?: Education0;
    Experience?: Experience0;
    ContactInformation?: ContactInformation0;
};
export declare type ResumeCreateFormValidationValues = {
    url?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    Summary?: ValidationFunction<Summary0>;
    Skills?: ValidationFunction<Skill>;
    Education?: ValidationFunction<Education0>;
    Experience?: ValidationFunction<Experience0>;
    ContactInformation?: ValidationFunction<ContactInformation0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResumeCreateFormOverridesProps = {
    ResumeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    Summary?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
    Education?: PrimitiveOverrideProps<AutocompleteProps>;
    Experience?: PrimitiveOverrideProps<AutocompleteProps>;
    ContactInformation?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type ResumeCreateFormProps = React.PropsWithChildren<{
    overrides?: ResumeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ResumeCreateFormInputValues) => ResumeCreateFormInputValues;
    onSuccess?: (fields: ResumeCreateFormInputValues) => void;
    onError?: (fields: ResumeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResumeCreateFormInputValues) => ResumeCreateFormInputValues;
    onValidate?: ResumeCreateFormValidationValues;
} & React.CSSProperties>;
export default function ResumeCreateForm(props: ResumeCreateFormProps): React.ReactElement;
