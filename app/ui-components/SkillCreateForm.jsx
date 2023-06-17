/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Skill, Resume, Company, Accomplishment } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SkillCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    link: "",
    resumeID: undefined,
    companyID: undefined,
    accomplishmentID: undefined,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [link, setLink] = React.useState(initialValues.link);
  const [resumeID, setResumeID] = React.useState(initialValues.resumeID);
  const [companyID, setCompanyID] = React.useState(initialValues.companyID);
  const [accomplishmentID, setAccomplishmentID] = React.useState(
    initialValues.accomplishmentID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setLink(initialValues.link);
    setResumeID(initialValues.resumeID);
    setCurrentResumeIDValue(undefined);
    setCurrentResumeIDDisplayValue("");
    setCompanyID(initialValues.companyID);
    setCurrentCompanyIDValue(undefined);
    setCurrentCompanyIDDisplayValue("");
    setAccomplishmentID(initialValues.accomplishmentID);
    setCurrentAccomplishmentIDValue(undefined);
    setCurrentAccomplishmentIDDisplayValue("");
    setErrors({});
  };
  const [currentResumeIDDisplayValue, setCurrentResumeIDDisplayValue] =
    React.useState("");
  const [currentResumeIDValue, setCurrentResumeIDValue] =
    React.useState(undefined);
  const resumeIDRef = React.createRef();
  const [currentCompanyIDDisplayValue, setCurrentCompanyIDDisplayValue] =
    React.useState("");
  const [currentCompanyIDValue, setCurrentCompanyIDValue] =
    React.useState(undefined);
  const companyIDRef = React.createRef();
  const [
    currentAccomplishmentIDDisplayValue,
    setCurrentAccomplishmentIDDisplayValue,
  ] = React.useState("");
  const [currentAccomplishmentIDValue, setCurrentAccomplishmentIDValue] =
    React.useState(undefined);
  const accomplishmentIDRef = React.createRef();
  const resumeRecords = useDataStoreBinding({
    type: "collection",
    model: Resume,
  }).items;
  const companyRecords = useDataStoreBinding({
    type: "collection",
    model: Company,
  }).items;
  const accomplishmentRecords = useDataStoreBinding({
    type: "collection",
    model: Accomplishment,
  }).items;
  const getDisplayValue = {
    resumeID: (r) => `${r?.url ? r?.url + " - " : ""}${r?.id}`,
    companyID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    accomplishmentID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [],
    link: [],
    resumeID: [{ type: "Required" }],
    companyID: [{ type: "Required" }],
    accomplishmentID: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          link,
          resumeID,
          companyID,
          accomplishmentID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Skill(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SkillCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              link,
              resumeID,
              companyID,
              accomplishmentID,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Link"
        isRequired={false}
        isReadOnly={false}
        value={link}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              link: value,
              resumeID,
              companyID,
              accomplishmentID,
            };
            const result = onChange(modelFields);
            value = result?.link ?? value;
          }
          if (errors.link?.hasError) {
            runValidationTasks("link", value);
          }
          setLink(value);
        }}
        onBlur={() => runValidationTasks("link", link)}
        errorMessage={errors.link?.errorMessage}
        hasError={errors.link?.hasError}
        {...getOverrideProps(overrides, "link")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              link,
              resumeID: value,
              companyID,
              accomplishmentID,
            };
            const result = onChange(modelFields);
            value = result?.resumeID ?? value;
          }
          setResumeID(value);
          setCurrentResumeIDValue(undefined);
        }}
        currentFieldValue={currentResumeIDValue}
        label={"Resume id"}
        items={resumeID ? [resumeID] : []}
        hasError={errors?.resumeID?.hasError}
        errorMessage={errors?.resumeID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.resumeID(resumeRecords.find((r) => r.id === value))
        }
        setFieldValue={(value) => {
          setCurrentResumeIDDisplayValue(
            getDisplayValue.resumeID(resumeRecords.find((r) => r.id === value))
          );
          setCurrentResumeIDValue(value);
        }}
        inputFieldRef={resumeIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Resume id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Resume"
          value={currentResumeIDDisplayValue}
          options={resumeRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.resumeID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentResumeIDValue(id);
            setCurrentResumeIDDisplayValue(label);
            runValidationTasks("resumeID", label);
          }}
          onClear={() => {
            setCurrentResumeIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.resumeID?.hasError) {
              runValidationTasks("resumeID", value);
            }
            setCurrentResumeIDDisplayValue(value);
            setCurrentResumeIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("resumeID", currentResumeIDValue)}
          errorMessage={errors.resumeID?.errorMessage}
          hasError={errors.resumeID?.hasError}
          ref={resumeIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resumeID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              link,
              resumeID,
              companyID: value,
              accomplishmentID,
            };
            const result = onChange(modelFields);
            value = result?.companyID ?? value;
          }
          setCompanyID(value);
          setCurrentCompanyIDValue(undefined);
        }}
        currentFieldValue={currentCompanyIDValue}
        label={"Company id"}
        items={companyID ? [companyID] : []}
        hasError={errors?.companyID?.hasError}
        errorMessage={errors?.companyID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.companyID(companyRecords.find((r) => r.id === value))
        }
        setFieldValue={(value) => {
          setCurrentCompanyIDDisplayValue(
            getDisplayValue.companyID(
              companyRecords.find((r) => r.id === value)
            )
          );
          setCurrentCompanyIDValue(value);
        }}
        inputFieldRef={companyIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Company id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Company"
          value={currentCompanyIDDisplayValue}
          options={companyRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.companyID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCompanyIDValue(id);
            setCurrentCompanyIDDisplayValue(label);
            runValidationTasks("companyID", label);
          }}
          onClear={() => {
            setCurrentCompanyIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.companyID?.hasError) {
              runValidationTasks("companyID", value);
            }
            setCurrentCompanyIDDisplayValue(value);
            setCurrentCompanyIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("companyID", currentCompanyIDValue)}
          errorMessage={errors.companyID?.errorMessage}
          hasError={errors.companyID?.hasError}
          ref={companyIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "companyID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              link,
              resumeID,
              companyID,
              accomplishmentID: value,
            };
            const result = onChange(modelFields);
            value = result?.accomplishmentID ?? value;
          }
          setAccomplishmentID(value);
          setCurrentAccomplishmentIDValue(undefined);
        }}
        currentFieldValue={currentAccomplishmentIDValue}
        label={"Accomplishment id"}
        items={accomplishmentID ? [accomplishmentID] : []}
        hasError={errors?.accomplishmentID?.hasError}
        errorMessage={errors?.accomplishmentID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.accomplishmentID(
            accomplishmentRecords.find((r) => r.id === value)
          )
        }
        setFieldValue={(value) => {
          setCurrentAccomplishmentIDDisplayValue(
            getDisplayValue.accomplishmentID(
              accomplishmentRecords.find((r) => r.id === value)
            )
          );
          setCurrentAccomplishmentIDValue(value);
        }}
        inputFieldRef={accomplishmentIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Accomplishment id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Accomplishment"
          value={currentAccomplishmentIDDisplayValue}
          options={accomplishmentRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.accomplishmentID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentAccomplishmentIDValue(id);
            setCurrentAccomplishmentIDDisplayValue(label);
            runValidationTasks("accomplishmentID", label);
          }}
          onClear={() => {
            setCurrentAccomplishmentIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.accomplishmentID?.hasError) {
              runValidationTasks("accomplishmentID", value);
            }
            setCurrentAccomplishmentIDDisplayValue(value);
            setCurrentAccomplishmentIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("accomplishmentID", currentAccomplishmentIDValue)
          }
          errorMessage={errors.accomplishmentID?.errorMessage}
          hasError={errors.accomplishmentID?.hasError}
          ref={accomplishmentIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "accomplishmentID")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
