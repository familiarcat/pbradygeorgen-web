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
import { Resume, Summary as Summary0, Skill } from "../models";
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
export default function ResumeUpdateForm(props) {
  const {
    id: idProp,
    resume: resumeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    address: "",
    phone: "",
    url: "",
    image: "",
    Summary: undefined,
    Skills: [],
    email: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [address, setAddress] = React.useState(initialValues.address);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [url, setUrl] = React.useState(initialValues.url);
  const [image, setImage] = React.useState(initialValues.image);
  const [Summary, setSummary] = React.useState(initialValues.Summary);
  const [Skills, setSkills] = React.useState(initialValues.Skills);
  const [email, setEmail] = React.useState(initialValues.email);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = resumeRecord
      ? { ...initialValues, ...resumeRecord, Summary, Skills: linkedSkills }
      : initialValues;
    setName(cleanValues.name);
    setAddress(cleanValues.address);
    setPhone(cleanValues.phone);
    setUrl(cleanValues.url);
    setImage(cleanValues.image);
    setSummary(cleanValues.Summary);
    setCurrentSummaryValue(undefined);
    setCurrentSummaryDisplayValue("");
    setSkills(cleanValues.Skills ?? []);
    setCurrentSkillsValue(undefined);
    setCurrentSkillsDisplayValue("");
    setEmail(cleanValues.email);
    setErrors({});
  };
  const [resumeRecord, setResumeRecord] = React.useState(resumeModelProp);
  const [linkedSkills, setLinkedSkills] = React.useState([]);
  const canUnlinkSkills = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Resume, idProp)
        : resumeModelProp;
      setResumeRecord(record);
      const SummaryRecord = record ? await record.Summary : undefined;
      setSummary(SummaryRecord);
      const linkedSkills = record ? await record.Skills.toArray() : [];
      setLinkedSkills(linkedSkills);
    };
    queryData();
  }, [idProp, resumeModelProp]);
  React.useEffect(resetStateValues, [resumeRecord, Summary, linkedSkills]);
  const [currentSummaryDisplayValue, setCurrentSummaryDisplayValue] =
    React.useState("");
  const [currentSummaryValue, setCurrentSummaryValue] =
    React.useState(undefined);
  const SummaryRef = React.createRef();
  const [currentSkillsDisplayValue, setCurrentSkillsDisplayValue] =
    React.useState("");
  const [currentSkillsValue, setCurrentSkillsValue] = React.useState(undefined);
  const SkillsRef = React.createRef();
  const getIDValue = {
    Summary: (r) => JSON.stringify({ id: r?.id }),
    Skills: (r) => JSON.stringify({ id: r?.id }),
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
  const summaryRecords = useDataStoreBinding({
    type: "collection",
    model: Summary0,
  }).items;
  const skillRecords = useDataStoreBinding({
    type: "collection",
    model: Skill,
  }).items;
  const getDisplayValue = {
    Summary: (r) => `${r?.description ? r?.description + " - " : ""}${r?.id}`,
    Skills: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    address: [],
    phone: [],
    url: [],
    image: [],
    Summary: [],
    Skills: [],
    email: [],
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
          name,
          address,
          phone,
          url,
          image,
          Summary,
          Skills,
          email,
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
          const promises = [];
          const summaryToUnlink = await resumeRecord.Summary;
          if (summaryToUnlink) {
            promises.push(
              DataStore.save(
                Summary0.copyOf(summaryToUnlink, (updated) => {
                  updated.Resume = undefined;
                  updated.summaryResumeId = undefined;
                })
              )
            );
          }
          const summaryToLink = modelFields.Summary;
          if (summaryToLink) {
            promises.push(
              DataStore.save(
                Summary0.copyOf(summaryToLink, (updated) => {
                  updated.Resume = resumeRecord;
                })
              )
            );
            const resumeToUnlink = await summaryToLink.Resume;
            if (resumeToUnlink) {
              promises.push(
                DataStore.save(
                  Resume.copyOf(resumeToUnlink, (updated) => {
                    updated.Summary = undefined;
                    updated.resumeSummaryId = undefined;
                  })
                )
              );
            }
          }
          const skillsToLink = [];
          const skillsToUnLink = [];
          const skillsSet = new Set();
          const linkedSkillsSet = new Set();
          Skills.forEach((r) => skillsSet.add(getIDValue.Skills?.(r)));
          linkedSkills.forEach((r) =>
            linkedSkillsSet.add(getIDValue.Skills?.(r))
          );
          linkedSkills.forEach((r) => {
            if (!skillsSet.has(getIDValue.Skills?.(r))) {
              skillsToUnLink.push(r);
            }
          });
          Skills.forEach((r) => {
            if (!linkedSkillsSet.has(getIDValue.Skills?.(r))) {
              skillsToLink.push(r);
            }
          });
          skillsToUnLink.forEach((original) => {
            if (!canUnlinkSkills) {
              throw Error(
                `Skill ${original.id} cannot be unlinked from Resume because resumeID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Skill.copyOf(original, (updated) => {
                  updated.resumeID = null;
                })
              )
            );
          });
          skillsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Skill.copyOf(original, (updated) => {
                  updated.resumeID = resumeRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            address: modelFields.address,
            phone: modelFields.phone,
            url: modelFields.url,
            image: modelFields.image,
            Summary: modelFields.Summary,
            email: modelFields.email,
          };
          promises.push(
            DataStore.save(
              Resume.copyOf(resumeRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
                if (!modelFieldsToSave.Summary) {
                  updated.resumeSummaryId = undefined;
                }
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ResumeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              address,
              phone,
              url,
              image,
              Summary,
              Skills,
              email,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              address: value,
              phone,
              url,
              image,
              Summary,
              Skills,
              email,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              address,
              phone: value,
              url,
              image,
              Summary,
              Skills,
              email,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Url"
        isRequired={false}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              address,
              phone,
              url: value,
              image,
              Summary,
              Skills,
              email,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              address,
              phone,
              url,
              image: value,
              Summary,
              Skills,
              email,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              address,
              phone,
              url,
              image,
              Summary: value,
              Skills,
              email,
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
          defaultValue={Summary}
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
              name,
              address,
              phone,
              url,
              image,
              Summary,
              Skills: values,
              email,
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
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              address,
              phone,
              url,
              image,
              Summary,
              Skills,
              email: value,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || resumeModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || resumeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
