import React, { useState } from "react";
import SEO from "src/components/seo";
import styled from "styled-components";
import Layout from "src/components/Layout";
import LeftArrow from "src/images/arrow-left.svg";
import RightArrow from "src/images/arrow-right.svg";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
  height: 100vh;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 96px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0;
  }
`;

const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 50%;
  min-height: 320px;
  width: 100%;
  margin-top: 35%;
  position: relative;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 25%;
    height: 45%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 20%;
    width: 60%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    margin-top: 14%;
  }
`;

const FormHeader = styled.h1`
  font-size: 2rem;
  text-align: left;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.5rem;
    width: 80%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 3.5rem;
    width: 100%;
  }
`;

const FormInput = styled.input`
  box-shadow: none;
  border: none;
  background-color: transparent;
  font-size: 1.25rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2rem;
  }
`;

const FormInputWrapper = styled.div`
  position: relative;
  width: 100%;
  :after {
    transition: transform 0.5s ease-in-out;
    transform-origin: left;
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    /* transform: ${props =>
      props.isFocused ? `scaleX(1)` : `scaleX(0.8)`}; */
    height: 1px;
    background-color: ${({ theme }) => theme.colors.softBlack};
  }
`;

const NavigationArrows = styled.div`
  display: flex;
  width: 25%;
  overflow: visible;
  position: relative;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 15%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 10%;
    margin-top: 3.25rem;
  }
  *:nth-child(2) {
    margin-left: 20px;
  }
  svg {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
`;

const SubmitBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 1s ease-in-out;
  font-size: 2.5rem;
  width: 100%;
  position: absolute;
  right: 40px;
  top: 45%;
  transform: translate(100%, -50%);

  &:hover {
    opacity: 0.75;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 1rem;
  width: 100%;
  transition: opacity 1s ease-in-out;
  opacity: 0;
  position: absolute;
  bottom: 26%;
  left: 0px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
    bottom: 28%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2rem;
    bottom: 24%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    bottom: 26%;
  }
`;

const ContactPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");

  const initSteps = [
    {
      question: "What's your name?",
      anwser: "",
      isValid: anwser => {
        if (anwser) return true;
        else throw "Don't be shy";
      }
    },
    {
      question: "What's your email?",
      anwser: "",
      isValid: anwser => {
        if (
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            anwser
          )
        )
          return true;
        else throw "Invalid email format";
      }
    },
    {
      question: "What type of project do you have in mind?",
      anwser: "",
      isValid: anwser => {
        if (anwser) return true;
        else throw "Please tell me about your project";
      }
    },
    {
      question: "Tell me about budget limitations?",
      anwser: "",
      isValid: anwser => {
        if (anwser) return true;
        else throw "Please tell me about your budget";
      }
    }
  ];
  const [steps, setSteps] = useState(initSteps);

  function next() {
    try {
      steps[activeStep].isValid(steps[activeStep].anwser);

      if (activeStep + 1 > steps.length - 1) return;
      setActiveStep(activeStep + 1);
      setError("");
    } catch (error) {
      setError(error);
    }
  }

  function back() {
    if (activeStep - 1 < 0) return;
    setActiveStep(activeStep - 1);
    setError("");
  }

  return (
    <Layout>
      <SEO title="Contact" keywords={["landscape", "contact", "greenery"]} />
      <FormWrapper>
        <FormContent>
          <FormHeader>{steps[activeStep].question}</FormHeader>
          <FormInputWrapper isFocused={isInputFocused}>
            <FormInput
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={event => {
                let changedSteps = [...steps];
                let element = { ...steps[activeStep] };
                element.anwser = event.target.value;
                changedSteps[activeStep] = element;
                setSteps(changedSteps);
              }}
              value={steps[activeStep].anwser}
            ></FormInput>
          </FormInputWrapper>
          <ErrorMessage className={error ? "show" : ""}>{error}</ErrorMessage>
          <NavigationArrows
            className={activeStep === steps.length - 1 ? "wider" : ""}
          >
            <LeftArrow
              className={activeStep === 0 ? "disactive" : ""}
              onClick={() => back()}
            />
            {activeStep === steps.length - 1 ? (
              <SubmitBtn>Submit</SubmitBtn>
            ) : null}
            <RightArrow
              className={activeStep === steps.length - 1 ? "hidden" : ""}
              onClick={() => next()}
            />
          </NavigationArrows>
        </FormContent>
      </FormWrapper>
    </Layout>
  );
};

export default ContactPage;
