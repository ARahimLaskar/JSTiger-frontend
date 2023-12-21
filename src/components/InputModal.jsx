import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addVendorData } from "../Redux/rootReducer";
// import { addTodo, updateTodo } from "../Redux/todoSlice";

const InputModal = ({ isOpen, onClose, item }) => {
  const [inputValues, setInputValues] = useState({
    vendorName: "",
    bankAccountNo: "",
    addressLine1: "",
    addressLine2: "",
  });
  const [error, setError] = useState(false);

  const [zipInput, setZipInput] = useState("");
  const [zipData, setZipData] = useState({});
  const [zipError, setZipError] = useState(false);
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const getData = () => {
    axios
      .get(`https://api.zippopotam.us/in/${zipInput}`)
      .then((res) => {
        console.log(res.data);
        setZipData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const validateZipCode = (input) => {
    const zipPattern = /^[0-9]{6}$/;
    return zipPattern.test(input);
  };
  useEffect(() => {
    if (zipInput !== "") {
      if (validateZipCode(zipInput)) {
        const debounceID = setTimeout(() => {
          getData(zipInput);
          setZipError(false);
        }, 600);
        return () => clearTimeout(debounceID);
      } else {
        setZipError(true);
      }
    }
  }, [isOpen, onClose, zipInput, item]);

  console.log("city", city);
  const handleSubmit = () => {
    const userData = {
      vendorName: inputValues.vendorName,
      bankAccountNo: inputValues.bankAccountNo,
      bankName: inputValues.bankName,
      addressLine1: inputValues.addressLine1,
      addressLine2: inputValues.addressLine2,
      city: city,
      zip: zipInput,
      country: zipData.country,
    };
    // axios
    //   .post("http://localhost:8080/data/add", userData)
    //   .then((res) => console.log("vendor add", res.data));

    console.log("userData", userData);
    dispatch(addVendorData(userData));

    setInputValues({
      vendorName: "",
      bankAccountNo: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
    });
    setZipInput("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Add Task</ModalHeader>

        <ModalCloseButton onClick={onClose} />
        <ModalBody pb={6}>
          <FormControl isRequired isInvalid={error}>
            <FormLabel mb="1" fontSize="sm">
              Vendor Name
            </FormLabel>
            <Input
              size="sm"
              fontSize="sm"
              type="text"
              mb="2"
              name="vendorName"
              value={inputValues.vendorName}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  vendorName: e.target.value,
                })
              }
              placeholder="Enter Vendor Name"
            />
            {error && (
              <FormErrorMessage fontSize="xs">
                Title is required
              </FormErrorMessage>
            )}
            <FormLabel mb="1" fontSize="sm">
              Bank Account No.
            </FormLabel>
            <Input
              size="sm"
              fontSize="sm"
              mb="2"
              type="text"
              name="bankAccountNo"
              value={inputValues.bankAccountNo}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  bankAccountNo: e.target.value,
                })
              }
              placeholder="Bank Account No."
            />
            {error && (
              <FormErrorMessage fontSize="xs">
                Account No. is required
              </FormErrorMessage>
            )}
            <FormLabel mb="1" fontSize="sm">
              Bank Name
            </FormLabel>
            <Input
              size="sm"
              fontSize="sm"
              mb="2"
              type="text"
              name="bankName"
              value={inputValues.bankName}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  bankName: e.target.value,
                })
              }
              placeholder="Bank Name"
            />
            {error && (
              <FormErrorMessage fontSize="xs">
                Bank Name is required
              </FormErrorMessage>
            )}
            <FormLabel mb="1" fontSize="sm">
              Address Line 1
            </FormLabel>
            <Textarea
              size="sm"
              fontSize="sm"
              mb="2"
              name="addressLine1"
              value={inputValues.addressLine1}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  addressLine1: e.target.value,
                })
              }
              placeholder="Enter Address Line 1"
            />
          </FormControl>
          <FormLabel mb="1" fontSize="sm">
            Address Line 2
          </FormLabel>
          <Textarea
            size="sm"
            fontSize="sm"
            mb="3"
            name="addressLine2"
            value={inputValues.addressLine2}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                addressLine2: e.target.value,
              })
            }
            placeholder="Enter Address Line 2"
          />
          <FormControl isRequired isInvalid={error}>
            <FormLabel mb="1" fontSize="sm">
              Zip Code
            </FormLabel>
            <Input
              size="sm"
              fontSize="sm"
              type="text"
              id="zipInput"
              pattern="[0-9]{6}"
              title="Please enter a 6-digit number."
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="Enter Zip Code"
            />

            {zipError && (
              <p style={{ color: "red", fontSize: "10px" }}>
                Please enter a 6-digit number.
              </p>
            )}
            {error && (
              <FormErrorMessage fontSize="xs">
                Zip Code is required
              </FormErrorMessage>
            )}
            <FormLabel mt="3" mb="1" fontSize="sm">
              City
            </FormLabel>
            <Select
              name="city"
              onChange={(e) => setCity(e.target.value)}
              mb="3"
              size="sm"
            >
              <option>Select Place</option>
              {zipData.places?.map((place, index) => (
                <option key={index} value={place["place name"]}>
                  {place["place name"]}
                </option>
              ))}
            </Select>

            {error && (
              <FormErrorMessage fontSize="xs">
                Bank Name is required
              </FormErrorMessage>
            )}
            <FormLabel mb="1" fontSize="sm">
              Country
            </FormLabel>
            <Input
              size="sm"
              fontSize="sm"
              mb="3"
              type="text"
              value={zipData.country}
              placeholder="Enter Country"
            />
            {error && (
              <FormErrorMessage fontSize="xs">
                Bank Name is required
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            fontSize="sm"
            onClick={handleSubmit}
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button size="sm" fontSize="sm" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MemoizedInputModal = React.memo(InputModal);
export { MemoizedInputModal };
