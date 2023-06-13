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
export default function Resume(props) {
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
    name: "",
    phone: "",
    email: "",
    url: "",
    image: "",
    Summary: undefined,
    Skills: [],
    address: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [email, setEmail] = React.useState(initialValues.email);
  const [url, setUrl] = React.useState(initialValues.url);
  const [image, setImage] = React.useState(initialValues.image);
  const [Summary, setSummary] = React.useState(initialValues.Summary);
  const [Skills, setSkills] = React.useState(initialValues.Skills);
  const [address, setAddress] = React.useState(initialValues.address);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPhone(initialValues.phone);
    setEmail(initialValues.email);
    setUrl(initialValues.url);
    setImage(initialValues.image);
    setSummary(initialValues.Summary);
    setCurrentSummaryValue(undefined);
    setCurrentSummaryDisplayValue("");
    setSkills(initialValues.Skills);
    setCurrentSkillsValue(undefined);
    setCurrentSkillsDisplayValue("");
    setAddress(initialValues.address);
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
    phone: [],
    email: [],
    url: [],
    image: [],
    Summary: [],
    Skills: [],
    address: [],
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
          phone,
          email,
          url,
          image,
          Summary,
          Skills,
          address,
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
            name: modelFields.name,
            phone: modelFields.phone,
            email: modelFields.email,
            url: modelFields.url,
            image: modelFields.image,
            Summary: modelFields.Summary,
            address: modelFields.address,
          };
          const resume = await DataStore.save(new Resume(modelFieldsToSave));
          const promises = [];
          const summaryToLink = modelFields.Summary;
          if (summaryToLink) {
            promises.push(
              DataStore.save(
                Summary0.copyOf(summaryToLink, (updated) => {
                  updated.Resume = resume;
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
      {...getOverrideProps(overrides, "Resume")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        placeholder="Enter your name as you would like it to be displayed"
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              phone,
              email,
              url,
              image,
              Summary,
              Skills,
              address,
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
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        placeholder="Add a number you can be reached at by phone or text"
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              phone: value,
              email,
              url,
              image,
              Summary,
              Skills,
              address,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        placeholder="Give everyone a place to send you emails - this is kinda important..."
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              phone,
              email: value,
              url,
              image,
              Summary,
              Skills,
              address,
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
      <TextField
        label="Web Site"
        isRequired={false}
        isReadOnly={false}
        placeholder="If you have a web presence (site, instagram, facebook, etc.) - add it here"
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              phone,
              email,
              url: value,
              image,
              Summary,
              Skills,
              address,
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
        placeholder="Optionally add a profile picture you'd like to represent your identity"
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              phone,
              email,
              url,
              image: value,
              Summary,
              Skills,
              address,
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
              phone,
              email,
              url,
              image,
              Summary: value,
              Skills,
              address,
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
              name,
              phone,
              email,
              url,
              image,
              Summary,
              Skills: values,
              address,
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
        label="Address"
        isRequired={false}
        isReadOnly={false}
        placeholder="Add your current or contact mailing address"
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              phone,
              email,
              url,
              image,
              Summary,
              Skills,
              address: value,
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
