/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Engagement, Skill } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EngagementUpdateFormInputValues = {
    client?: string;
    startDate?: string;
    endDate?: string;
    companyID?: string;
    Skills?: Skill[];
};
export declare type EngagementUpdateFormValidationValues = {
    client?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    companyID?: ValidationFunction<string>;
    Skills?: ValidationFunction<Skill>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EngagementUpdateFormOverridesProps = {
    EngagementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    client?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    companyID?: PrimitiveOverrideProps<AutocompleteProps>;
    Skills?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EngagementUpdateFormProps = React.PropsWithChildren<{
    overrides?: EngagementUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    engagement?: Engagement;
    onSubmit?: (fields: EngagementUpdateFormInputValues) => EngagementUpdateFormInputValues;
    onSuccess?: (fields: EngagementUpdateFormInputValues) => void;
    onError?: (fields: EngagementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EngagementUpdateFormInputValues) => EngagementUpdateFormInputValues;
    onValidate?: EngagementUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EngagementUpdateForm(props: EngagementUpdateFormProps): React.ReactElement;
