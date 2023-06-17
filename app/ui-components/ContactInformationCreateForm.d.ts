/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContactInformationCreateFormInputValues = {
    name?: string;
    email?: string;
    phone?: string;
};
export declare type ContactInformationCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactInformationCreateFormOverridesProps = {
    ContactInformationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContactInformationCreateFormProps = React.PropsWithChildren<{
    overrides?: ContactInformationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ContactInformationCreateFormInputValues) => ContactInformationCreateFormInputValues;
    onSuccess?: (fields: ContactInformationCreateFormInputValues) => void;
    onError?: (fields: ContactInformationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContactInformationCreateFormInputValues) => ContactInformationCreateFormInputValues;
    onValidate?: ContactInformationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ContactInformationCreateForm(props: ContactInformationCreateFormProps): React.ReactElement;
