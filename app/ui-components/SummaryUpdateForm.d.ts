/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Summary, Resume as Resume0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SummaryUpdateFormInputValues = {
    description?: string;
    image?: string;
    header?: string;
    Resume?: Resume0;
};
export declare type SummaryUpdateFormValidationValues = {
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    header?: ValidationFunction<string>;
    Resume?: ValidationFunction<Resume0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SummaryUpdateFormOverridesProps = {
    SummaryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    header?: PrimitiveOverrideProps<TextFieldProps>;
    Resume?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type SummaryUpdateFormProps = React.PropsWithChildren<{
    overrides?: SummaryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    summary?: Summary;
    onSubmit?: (fields: SummaryUpdateFormInputValues) => SummaryUpdateFormInputValues;
    onSuccess?: (fields: SummaryUpdateFormInputValues) => void;
    onError?: (fields: SummaryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SummaryUpdateFormInputValues) => SummaryUpdateFormInputValues;
    onValidate?: SummaryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SummaryUpdateForm(props: SummaryUpdateFormProps): React.ReactElement;
