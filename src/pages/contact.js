import React from "react";
import SEO from "src/components/seo";
import styled from "styled-components";
import Layout from "src/components/Layout";
import LeftArrow from "src/images/arrow-left.svg";
import RightArrow from "src/images/arrow-right.svg";
import Postcard from "src/images/postcard.svg";
import { TimelineMax, Power4 } from "gsap";
import axios from "axios";

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

const SubmitBtn = styled.span`
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

const PostcardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  justify-content: center;
  align-content: center;
  svg {
    width: 25%;
  }
`;

export default class ContactPage extends React.Component {
  constructor(props) {
    super(props);
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
    this.state = {
      isInputFocused: false,
      activeStep: 0,
      steps: initSteps,
      error: ""
    };
  }
  componentDidMount() {
    const arrows = document.getElementById("form-arrows");
    const input = document.getElementById("form-input");
    const header = document.getElementById("form-header");
    new TimelineMax({ delay: 0.5 })
      .fromTo(header, 0.75, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power4 })
      .fromTo(input, 0.75, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power4 })
      .fromTo(arrows, 0.75, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power4 });

    this.playAfterSuccessAnimation();
  }

  playAfterSuccessAnimation() {
    const formContent = document.getElementById("form-content");
    const postcard = document.getElementById("postcard");
    const postcardWriting = postcard.getElementById("postcard-writing");
    const postcardBorder = postcard.getElementById("postcard-border");
    const postcardMiddle = postcard.getElementById("postcard-middle");
    const postcardStempelBorder = postcard.getElementById(
      "postcard-stempel-border"
    );
    const postcardStempelMiddle = postcard.getElementById(
      "postcard-stempel-middle"
    );

    const duration = 0.35;
    new TimelineMax({ delay: 4 })
      .fromTo(formContent, 1, { y: 0 }, { y: "-150%", ease: "back.in(1.7)" })
      .fromTo(formContent, 0.35, { autoAlpha: 1 }, { autoAlpha: 0 }, "-=0.25")
      .fromTo(
        postcard,
        1,
        { autoAlpha: 0, y: "-100%" },
        { y: 0, autoAlpha: 1, ease: "back.out(1.7)" }
      )
      .fromTo(
        postcardStempelBorder,
        duration,
        { autoAlpha: 0 },
        { autoAlpha: 1 }
      )
      .fromTo(
        postcardStempelMiddle,
        duration,
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "-=0.15"
      )
      .fromTo(postcardMiddle, duration, { autoAlpha: 0 }, { autoAlpha: 1 })
      .fromTo(
        postcardWriting.children,
        duration,
        { autoAlpha: 0 },
        { autoAlpha: 1, stagger: 0.1 }
      );
  }

  next() {
    try {
      this.state.steps[this.state.activeStep].isValid(
        this.state.steps[this.state.activeStep].anwser
      );
      if (this.state.activeStep + 1 === this.state.steps.length)
        return this.submit();

      new TimelineMax({
        repeat: 1,
        onRepeat: () =>
          this.setState({
            activeStep: this.state.activeStep + 1,
            error: ""
          }),
        yoyo: true
      }).fromTo(
        ".form-element",
        0.4,
        { y: "0", autoAlpha: 1, ease: Power4 },
        { y: "100%", autoAlpha: 0, ease: Power4, stagger: 0.2 }
      );
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  back() {
    if (this.state.activeStep - 1 < 0) return;

    new TimelineMax({
      repeat: 1,
      onRepeat: () =>
        this.setState({
          activeStep: this.state.activeStep - 1,
          error: ""
        }),
      yoyo: true
    }).fromTo(
      ".form-element",
      0.4,
      { y: "0", autoAlpha: 1, ease: Power4 },
      { y: "100%", autoAlpha: 0, ease: Power4, stagger: 0.2 }
    );
  }

  async submit() {
    if (this.state.activeStep === this.state.steps.length - 1) {
      const dataToSend = {
        from: this.state.steps[1].anwser.trim(),
        to: `${process.env.GATSBY_RECIVING_EMAIL}`,
        subject: "Biznes - Oliwia Czuk",
        text: this.state.steps
          .map(step => step.question + "\n" + step.anwser + "\n\n")
          .join("")
      };

      try {
        // const response = await axios.post(
        //   process.env.GATSBY_EMAIL_URL,
        //   dataToSend
        // );
        // console.log(response);

        this.playAfterSuccessAnimation();
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Contact" keywords={["landscape", "contact", "greenery"]} />
        <FormWrapper>
          <FormContent id="form-content" onSubmit={e => e.preventDefault()}>
            <FormHeader id="form-header" className="form-element">
              {this.state.steps[this.state.activeStep].question}
            </FormHeader>
            <FormInputWrapper
              id="form-input"
              className="form-element"
              isFocused={this.state.isInputFocused}
            >
              <FormInput
                onKeyDown={event => {
                  if (event.key == "Enter") {
                    this.next();
                  }
                }}
                onFocus={() =>
                  this.setState({
                    isInputFocused: true
                  })
                }
                onBlur={() =>
                  this.setState({
                    isInputFocused: false
                  })
                }
                onChange={event => {
                  let changedSteps = [...this.state.steps];
                  let element = { ...this.state.steps[this.state.activeStep] };
                  element.anwser = event.target.value;
                  changedSteps[this.state.activeStep] = element;
                  this.setState({
                    steps: changedSteps
                  });
                }}
                value={this.state.steps[this.state.activeStep].anwser}
              ></FormInput>
            </FormInputWrapper>
            <ErrorMessage className={this.state.error ? "show" : ""}>
              {this.state.error}
            </ErrorMessage>
            <NavigationArrows className="form-element" id="form-arrows">
              <LeftArrow
                className={this.state.activeStep === 0 ? "disactive" : ""}
                onClick={() => this.back()}
              />
              {this.state.activeStep === this.state.steps.length - 1 ? (
                <SubmitBtn>Submit</SubmitBtn>
              ) : null}
              <RightArrow
                className={
                  this.state.activeStep === this.state.steps.length - 1
                    ? "hidden"
                    : ""
                }
                onClick={() => this.next()}
              />
            </NavigationArrows>
          </FormContent>
        </FormWrapper>

        <PostcardWrapper>
          <Postcard id="postcard" />
        </PostcardWrapper>
      </Layout>
    );
  }
}
