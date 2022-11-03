import { useBreakpointValue } from "@chakra-ui/react";

export function useIsBaseBreakpoint() {
  return useBreakpointValue({ base: true, md: false });
}
