// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import * as mediaQueryHooks from "@chakra-ui/media-query";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// TODO: I commented this and now tests are passing. I don't know why this was here. Need to investigate.
//https://github.com/chakra-ui/chakra-ui/discussions/5558
// jest.spyOn(mediaQueryHooks, "useBreakpointValue");
