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
import { Accomplishment, Skill, Engagement, Company } from "../models";
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
export default function AccomplishmentCreateForm(props) {
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
    description: "",
    link: "",
    engagementID: undefined,
    companyID: undefined,
    Skills: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [link, setLink] = React.useState(initialValues.link);
  const [engagementID, setEngagementID] = React.useState(
    initialValues.engagementID
  );
  const [companyID, setCompanyID] = React.useState(initialValues.companyID);
  const [Skills, setSkills] = React.useState(initialValues.Skills);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setLink(initialValues.link);
    setEngagementID(initialValues.engagementID);
    setCurrentEngagementIDValue(undefined);
    setCurrentEngagementIDDisplayValue("");
    setCompanyID(initialValues.companyID);
    setCurrentCompanyIDValue(undefined);
    setCurrentCompanyIDDisplayValue("");
    setSkills(initialValues.Skills);
    setCurrentSkillsValue(undefined);
    setCurrentSkillsDisplayValue("");
    setErrors({});
  };
  const [currentEngagementIDDisplayValue, setCurrentEngagementIDDisplayValue] =
    React.useState("");
  const [currentEngagementIDValue, setCurrentEngagementIDValue] =
    React.useState(undefined);
  const engagementIDRef = React.createRef();
  const [currentCompanyIDDisplayValue, setCurrentCompanyIDDisplayValue] =
    React.useState("");
  const [currentCompanyIDValue, setCurrentCompanyIDValue] =
    React.useState(undefined);
  const companyIDRef = React.createRef();
  const [currentSkillsDisplayValue, setCurrentSkillsDisplayValue] =
    React.useState("");
  const [currentSkillsValue, setCurrentSkillsValue] = React.useState(undefined);
  const SkillsRef = React.createRef();
  const getIDValue = {
    Skills: (r) => JSON.stringify({ id: r?.id }),
  };
  const SkillsIdSet = new Set(
    Array.isArray(Skills)
      ? Skills.map((r) => getIDValue.Skills?.(r))
      : getIDValue.Skills?.(Skills)
  );
  const engagementRecords = useDataStoreBinding({
    type: "collection",
    model: Engagement,
  }).items;
  const companyRecords = useDataStoreBinding({
    type: "collection",
    model: Company,
  }).items;
  const skillRecords = useDataStoreBinding({
    type: "collection",
    model: Skill,
  }).items;
  const getDisplayValue = {
    engagementID: (r) => `${r?.client ? r?.client + " - " : ""}${r?.id}`,
    companyID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Skills: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [],
    description: [],
    link: [],
    engagementID: [{ type: "Required" }],
    companyID: [{ type: "Required" }],
    Skills: [],
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
          description,
          link,
          engagementID,
          companyID,
          Skills,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const modelFieldsToSave = {
            title: modelFields.title,
            description: modelFields.description,
            link: modelFields.link,
            engagementID: modelFields.engagementID,
            companyID: modelFields.companyID,
          };
          const accomplishment = await DataStore.save(
            new Accomplishment(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...Skills.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  Skill.copyOf(original, (updated) => {
                    updated.accomplishmentID = accomplishment.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "AccomplishmentCreateForm")}
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
              description,
              link,
              engagementID,
              companyID,
              Skills,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              link,
              engagementID,
              companyID,
              Skills,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
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
              description,
              link: value,
              engagementID,
              companyID,
              Skills,
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
              description,
              link,
              engagementID: value,
              companyID,
              Skills,
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
              description,
              link,
              engagementID,
              companyID: value,
              Skills,
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
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              link,
              engagementID,
              companyID,
              Skills: values,
            };
            const result = onChange(modelFields);
            values = result?.Skills ?? values;
          }
          setSkills(values);
          setCurrentSkillsValue(undefined);
          setCurrentSkillsDisplayValue("");
        }}
        currentFieldValue={currentSkillsValue}
        label={"Skills"}
        items={Skills}
        hasError={errors?.Skills?.hasError}
        errorMessage={errors?.Skills?.errorMessage}
        getBadgeText={getDisplayValue.Skills}
        setFieldValue={(model) => {
          setCurrentSkillsDisplayValue(getDisplayValue.Skills(model));
          setCurrentSkillsValue(model);
        }}
        inputFieldRef={SkillsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Skills"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Skill"
          value={currentSkillsDisplayValue}
          options={skillRecords
            .filter((r) => !SkillsIdSet.has(getIDValue.Skills?.(r)))
            .map((r) => ({
              id: getIDValue.Skills?.(r),
              label: getDisplayValue.Skills?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSkillsValue(
              skillRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSkillsDisplayValue(label);
            runValidationTasks("Skills", label);
          }}
          onClear={() => {
            setCurrentSkillsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Skills?.hasError) {
              runValidationTasks("Skills", value);
            }
            setCurrentSkillsDisplayValue(value);
            setCurrentSkillsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Skills", currentSkillsDisplayValue)}
          errorMessage={errors.Skills?.errorMessage}
          hasError={errors.Skills?.hasError}
          ref={SkillsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Skills")}
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
