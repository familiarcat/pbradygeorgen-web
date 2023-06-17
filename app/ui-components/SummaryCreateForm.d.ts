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
export declare type SummaryCreateFormInputValues = {
    goals?: string;
    persona?: string;
};
export declare type SummaryCreateFormValidationValues = {
    goals?: ValidationFunction<string>;
    persona?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SummaryCreateFormOverridesProps = {
    SummaryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    goals?: PrimitiveOverrideProps<TextFieldProps>;
    persona?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SummaryCreateFormProps = React.PropsWithChildren<{
    overrides?: SummaryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SummaryCreateFormInputValues) => SummaryCreateFormInputValues;
    onSuccess?: (fields: SummaryCreateFormInputValues) => void;
    onError?: (fields: SummaryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SummaryCreateFormInputValues) => SummaryCreateFormInputValues;
    onValidate?: SummaryCreateFormValidationValues;
} & React.CSSProperties>;
export default function SummaryCreateForm(props: SummaryCreateFormProps): React.ReactElement;
