import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

type InputProps = {
  label: string | undefined;
  placeholder: string | undefined;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

type PasswordInputProps = InputProps & {
  showButton: boolean;
};

export const PasswordInput = (props: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel color={"gray.600"}>{props.label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          color={"gray.600"}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.label}
        />
        {props.showButton ? (
          <InputRightElement>
            <Button
              h="1.75rem"
              marginRight="0.5rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        ) : (
          <></>
        )}
      </InputGroup>
    </FormControl>
  );
};

PasswordInput.defaultProps = {
  label: "パスワード",
  placeholder: "Password",
  showButton: true,
};

export const EmailInput = (props: InputProps) => {
  return (
    <FormControl>
      <FormLabel color={"gray.600"}>{props.label}</FormLabel>
      <Input
        type="email"
        color={"gray.600"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </FormControl>
  );
};

EmailInput.defaultProps = {
  label: "メールアドレス",
  placeholder: "Email",
};
