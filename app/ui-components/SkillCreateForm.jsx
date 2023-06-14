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
import { Skill, Engagement, Resume } from "../models";
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
    engagementID: undefined,
    resumeID: undefined,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [link, setLink] = React.useState(initialValues.link);
  const [engagementID, setEngagementID] = React.useState(
    initialValues.engagementID
  );
  const [resumeID, setResumeID] = React.useState(initialValues.resumeID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setLink(initialValues.link);
    setEngagementID(initialValues.engagementID);
    setCurrentEngagementIDValue(undefined);
    setCurrentEngagementIDDisplayValue("");
    setResumeID(initialValues.resumeID);
    setCurrentResumeIDValue(undefined);
    setCurrentResumeIDDisplayValue("");
    setErrors({});
  };
  const [currentEngagementIDDisplayValue, setCurrentEngagementIDDisplayValue] =
    React.useState("");
  const [currentEngagementIDValue, setCurrentEngagementIDValue] =
    React.useState(undefined);
  const engagementIDRef = React.createRef();
  const [currentResumeIDDisplayValue, setCurrentResumeIDDisplayValue] =
    React.useState("");
  const [currentResumeIDValue, setCurrentResumeIDValue] =
    React.useState(undefined);
  const resumeIDRef = React.createRef();
  const engagementRecords = useDataStoreBinding({
    type: "collection",
    model: Engagement,
  }).items;
  const resumeRecords = useDataStoreBinding({
    type: "collection",
    model: Resume,
  }).items;
  const getDisplayValue = {
    engagementID: (r) => `${r?.client ? r?.client + " - " : ""}${r?.id}`,
    resumeID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [],
    link: [],
    engagementID: [{ type: "Required" }],
    resumeID: [{ type: "Required" }],
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
          engagementID,
          resumeID,
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
              engagementID,
              resumeID,
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
              engagementID,
              resumeID,
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
              engagementID: value,
              resumeID,
            };
            const result = onChange(modelFields);
            value = result?.engagementID ?? value;
          }
          setEngagementID(value);
          setCurrentEngagementIDValue(undefined);
        }}
        currentFieldValue={currentEngagementIDValue}
        label={"Engagement id"}
        items={engagementID ? [engagementID] : []}
        hasError={errors?.engagementID?.hasError}
        errorMessage={errors?.engagementID?.errorMessage}
        getBadgeText={(value) =>
          getDisplayValue.engagementID(
            engagementRecords.find((r) => r.id === value)
          )
        }
        setFieldValue={(value) => {
          setCurrentEngagementIDDisplayValue(
            getDisplayValue.engagementID(
              engagementRecords.find((r) => r.id === value)
            )
          );
          setCurrentEngagementIDValue(value);
        }}
        inputFieldRef={engagementIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Engagement id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Engagement"
          value={currentEngagementIDDisplayValue}
          options={engagementRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.engagementID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEngagementIDValue(id);
            setCurrentEngagementIDDisplayValue(label);
            runValidationTasks("engagementID", label);
          }}
          onClear={() => {
            setCurrentEngagementIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.engagementID?.hasError) {
              runValidationTasks("engagementID", value);
            }
            setCurrentEngagementIDDisplayValue(value);
            setCurrentEngagementIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("engagementID", currentEngagementIDValue)
          }
          errorMessage={errors.engagementID?.errorMessage}
          hasError={errors.engagementID?.hasError}
          ref={engagementIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "engagementID")}
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
              engagementID,
              resumeID: value,
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
