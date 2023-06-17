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
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import {
  Resume,
  Summary as Summary0,
  Skill,
  Education as Education0,
  Experience as Experience0,
  ContactInformation as ContactInformation0,
} from "../models";
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
export default function ResumeCreateForm(props) {
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
    Summary: undefined,
    Skills: [],
    Education: undefined,
    Experience: undefined,
    ContactInformation: undefined,
  };
  const [Summary, setSummary] = React.useState(initialValues.Summary);
  const [Skills, setSkills] = React.useState(initialValues.Skills);
  const [Education, setEducation] = React.useState(initialValues.Education);
  const [Experience, setExperience] = React.useState(initialValues.Experience);
  const [ContactInformation, setContactInformation] = React.useState(
    initialValues.ContactInformation
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSummary(initialValues.Summary);
    setCurrentSummaryValue(undefined);
    setCurrentSummaryDisplayValue("");
    setSkills(initialValues.Skills);
    setCurrentSkillsValue(undefined);
    setCurrentSkillsDisplayValue("");
    setEducation(initialValues.Education);
    setCurrentEducationValue(undefined);
    setCurrentEducationDisplayValue("");
    setExperience(initialValues.Experience);
    setCurrentExperienceValue(undefined);
    setCurrentExperienceDisplayValue("");
    setContactInformation(initialValues.ContactInformation);
    setCurrentContactInformationValue(undefined);
    setCurrentContactInformationDisplayValue("");
    setErrors({});
  };
  const [currentSummaryDisplayValue, setCurrentSummaryDisplayValue] =
    React.useState("");
  const [currentSummaryValue, setCurrentSummaryValue] =
    React.useState(undefined);
  const SummaryRef = React.createRef();
  const [currentSkillsDisplayValue, setCurrentSkillsDisplayValue] =
    React.useState("");
  const [currentSkillsValue, setCurrentSkillsValue] = React.useState(undefined);
  const SkillsRef = React.createRef();
  const [currentEducationDisplayValue, setCurrentEducationDisplayValue] =
    React.useState("");
  const [currentEducationValue, setCurrentEducationValue] =
    React.useState(undefined);
  const EducationRef = React.createRef();
  const [currentExperienceDisplayValue, setCurrentExperienceDisplayValue] =
    React.useState("");
  const [currentExperienceValue, setCurrentExperienceValue] =
    React.useState(undefined);
  const ExperienceRef = React.createRef();
  const [
    currentContactInformationDisplayValue,
    setCurrentContactInformationDisplayValue,
  ] = React.useState("");
  const [currentContactInformationValue, setCurrentContactInformationValue] =
    React.useState(undefined);
  const ContactInformationRef = React.createRef();
  const getIDValue = {
    Summary: (r) => JSON.stringify({ id: r?.id }),
    Skills: (r) => JSON.stringify({ id: r?.id }),
    Education: (r) => JSON.stringify({ id: r?.id }),
    Experience: (r) => JSON.stringify({ id: r?.id }),
    ContactInformation: (r) => JSON.stringify({ id: r?.id }),
  };
  const SummaryIdSet = new Set(
    Array.isArray(Summary)
      ? Summary.map((r) => getIDValue.Summary?.(r))
      : getIDValue.Summary?.(Summary)
  );
  const SkillsIdSet = new Set(
    Array.isArray(Skills)
      ? Skills.map((r) => getIDValue.Skills?.(r))
      : getIDValue.Skills?.(Skills)
  );
  const EducationIdSet = new Set(
    Array.isArray(Education)
      ? Education.map((r) => getIDValue.Education?.(r))
      : getIDValue.Education?.(Education)
  );
  const ExperienceIdSet = new Set(
    Array.isArray(Experience)
      ? Experience.map((r) => getIDValue.Experience?.(r))
      : getIDValue.Experience?.(Experience)
  );
  const ContactInformationIdSet = new Set(
    Array.isArray(ContactInformation)
      ? ContactInformation.map((r) => getIDValue.ContactInformation?.(r))
      : getIDValue.ContactInformation?.(ContactInformation)
  );
  const summaryRecords = useDataStoreBinding({
    type: "collection",
    model: Summary0,
  }).items;
  const skillRecords = useDataStoreBinding({
    type: "collection",
    model: Skill,
  }).items;
  const educationRecords = useDataStoreBinding({
    type: "collection",
    model: Education0,
  }).items;
  const experienceRecords = useDataStoreBinding({
    type: "collection",
    model: Experience0,
  }).items;
  const contactInformationRecords = useDataStoreBinding({
    type: "collection",
    model: ContactInformation0,
  }).items;
  const getDisplayValue = {
    Summary: (r) => `${r?.goals ? r?.goals + " - " : ""}${r?.id}`,
    Skills: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Education: (r) => `${r?.summary ? r?.summary + " - " : ""}${r?.id}`,
    Experience: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    ContactInformation: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    Summary: [],
    Skills: [],
    Education: [],
    Experience: [],
    ContactInformation: [],
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
          Summary,
          Skills,
          Education,
          Experience,
          ContactInformation,
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
            Summary: modelFields.Summary,
            Education: modelFields.Education,
            Experience: modelFields.Experience,
            ContactInformation: modelFields.ContactInformation,
          };
          const resume = await DataStore.save(new Resume(modelFieldsToSave));
          const promises = [];
          promises.push(
            ...Skills.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  Skill.copyOf(original, (updated) => {
                    updated.resumeID = resume.id;
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
      {...getOverrideProps(overrides, "ResumeCreateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Summary: value,
              Skills,
              Education,
              Experience,
              ContactInformation,
            };
            const result = onChange(modelFields);
            value = result?.Summary ?? value;
          }
          setSummary(value);
          setCurrentSummaryValue(undefined);
          setCurrentSummaryDisplayValue("");
        }}
        currentFieldValue={currentSummaryValue}
        label={"Summary"}
        items={Summary ? [Summary] : []}
        hasError={errors?.Summary?.hasError}
        errorMessage={errors?.Summary?.errorMessage}
        getBadgeText={getDisplayValue.Summary}
        setFieldValue={(model) => {
          setCurrentSummaryDisplayValue(getDisplayValue.Summary(model));
          setCurrentSummaryValue(model);
        }}
        inputFieldRef={SummaryRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Summary"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Summary"
          value={currentSummaryDisplayValue}
          options={summaryRecords
            .filter((r) => !SummaryIdSet.has(getIDValue.Summary?.(r)))
            .map((r) => ({
              id: getIDValue.Summary?.(r),
              label: getDisplayValue.Summary?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSummaryValue(
              summaryRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSummaryDisplayValue(label);
            runValidationTasks("Summary", label);
          }}
          onClear={() => {
            setCurrentSummaryDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Summary?.hasError) {
              runValidationTasks("Summary", value);
            }
            setCurrentSummaryDisplayValue(value);
            setCurrentSummaryValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Summary", currentSummaryDisplayValue)
          }
          errorMessage={errors.Summary?.errorMessage}
          hasError={errors.Summary?.hasError}
          ref={SummaryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Summary")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Summary,
              Skills: values,
              Education,
              Experience,
              ContactInformation,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Summary,
              Skills,
              Education: value,
              Experience,
              ContactInformation,
            };
            const result = onChange(modelFields);
            value = result?.Education ?? value;
          }
          setEducation(value);
          setCurrentEducationValue(undefined);
          setCurrentEducationDisplayValue("");
        }}
        currentFieldValue={currentEducationValue}
        label={"Education"}
        items={Education ? [Education] : []}
        hasError={errors?.Education?.hasError}
        errorMessage={errors?.Education?.errorMessage}
        getBadgeText={getDisplayValue.Education}
        setFieldValue={(model) => {
          setCurrentEducationDisplayValue(getDisplayValue.Education(model));
          setCurrentEducationValue(model);
        }}
        inputFieldRef={EducationRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Education"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Education"
          value={currentEducationDisplayValue}
          options={educationRecords
            .filter((r) => !EducationIdSet.has(getIDValue.Education?.(r)))
            .map((r) => ({
              id: getIDValue.Education?.(r),
              label: getDisplayValue.Education?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEducationValue(
              educationRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEducationDisplayValue(label);
            runValidationTasks("Education", label);
          }}
          onClear={() => {
            setCurrentEducationDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Education?.hasError) {
              runValidationTasks("Education", value);
            }
            setCurrentEducationDisplayValue(value);
            setCurrentEducationValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Education", currentEducationDisplayValue)
          }
          errorMessage={errors.Education?.errorMessage}
          hasError={errors.Education?.hasError}
          ref={EducationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Education")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Summary,
              Skills,
              Education,
              Experience: value,
              ContactInformation,
            };
            const result = onChange(modelFields);
            value = result?.Experience ?? value;
          }
          setExperience(value);
          setCurrentExperienceValue(undefined);
          setCurrentExperienceDisplayValue("");
        }}
        currentFieldValue={currentExperienceValue}
        label={"Experience"}
        items={Experience ? [Experience] : []}
        hasError={errors?.Experience?.hasError}
        errorMessage={errors?.Experience?.errorMessage}
        getBadgeText={getDisplayValue.Experience}
        setFieldValue={(model) => {
          setCurrentExperienceDisplayValue(getDisplayValue.Experience(model));
          setCurrentExperienceValue(model);
        }}
        inputFieldRef={ExperienceRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Experience"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Experience"
          value={currentExperienceDisplayValue}
          options={experienceRecords
            .filter((r) => !ExperienceIdSet.has(getIDValue.Experience?.(r)))
            .map((r) => ({
              id: getIDValue.Experience?.(r),
              label: getDisplayValue.Experience?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentExperienceValue(
              experienceRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentExperienceDisplayValue(label);
            runValidationTasks("Experience", label);
          }}
          onClear={() => {
            setCurrentExperienceDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Experience?.hasError) {
              runValidationTasks("Experience", value);
            }
            setCurrentExperienceDisplayValue(value);
            setCurrentExperienceValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Experience", currentExperienceDisplayValue)
          }
          errorMessage={errors.Experience?.errorMessage}
          hasError={errors.Experience?.hasError}
          ref={ExperienceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Experience")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Summary,
              Skills,
              Education,
              Experience,
              ContactInformation: value,
            };
            const result = onChange(modelFields);
            value = result?.ContactInformation ?? value;
          }
          setContactInformation(value);
          setCurrentContactInformationValue(undefined);
          setCurrentContactInformationDisplayValue("");
        }}
        currentFieldValue={currentContactInformationValue}
        label={"Contact information"}
        items={ContactInformation ? [ContactInformation] : []}
        hasError={errors?.ContactInformation?.hasError}
        errorMessage={errors?.ContactInformation?.errorMessage}
        getBadgeText={getDisplayValue.ContactInformation}
        setFieldValue={(model) => {
          setCurrentContactInformationDisplayValue(
            getDisplayValue.ContactInformation(model)
          );
          setCurrentContactInformationValue(model);
        }}
        inputFieldRef={ContactInformationRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Contact information"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search ContactInformation"
          value={currentContactInformationDisplayValue}
          options={contactInformationRecords
            .filter(
              (r) =>
                !ContactInformationIdSet.has(getIDValue.ContactInformation?.(r))
            )
            .map((r) => ({
              id: getIDValue.ContactInformation?.(r),
              label: getDisplayValue.ContactInformation?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentContactInformationValue(
              contactInformationRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentContactInformationDisplayValue(label);
            runValidationTasks("ContactInformation", label);
          }}
          onClear={() => {
            setCurrentContactInformationDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ContactInformation?.hasError) {
              runValidationTasks("ContactInformation", value);
            }
            setCurrentContactInformationDisplayValue(value);
            setCurrentContactInformationValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "ContactInformation",
              currentContactInformationDisplayValue
            )
          }
          errorMessage={errors.ContactInformation?.errorMessage}
          hasError={errors.ContactInformation?.hasError}
          ref={ContactInformationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ContactInformation")}
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
