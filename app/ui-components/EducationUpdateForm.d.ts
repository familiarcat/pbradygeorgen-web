/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Education, Degree } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EducationUpdateFormInputValues = {
    summary?: string;
    Degrees?: Degree[];
};
export declare type EducationUpdateFormValidationValues = {
    summary?: ValidationFunction<string>;
    Degrees?: ValidationFunction<Degree>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EducationUpdateFormOverridesProps = {
    EducationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
    Degrees?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EducationUpdateFormProps = React.PropsWithChildren<{
    overrides?: EducationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    education?: Education;
    onSubmit?: (fields: EducationUpdateFormInputValues) => EducationUpdateFormInputValues;
    onSuccess?: (fields: EducationUpdateFormInputValues) => void;
    onError?: (fields: EducationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EducationUpdateFormInputValues) => EducationUpdateFormInputValues;
    onValidate?: EducationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EducationUpdateForm(props: EducationUpdateFormProps): React.ReactElement;
