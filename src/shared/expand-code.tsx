import { Text, Button, Box  } from "@liftedinit/ui";
import { useState } from "react";

export function ExpandCode({ content }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const ExpandButton = () => (
    <Button as="a" variant="link" size="sm" ml={1} onClick={toggleExpanded} color="brand.teal.500">
      {isExpanded ? "(Collapse)" : "(...)"}
    </Button>
  );

  return (
    <Box bg="white" my={6}>
      {
        isExpanded ? (
          <Text maxW="50em">
            {content}
            <ExpandButton />
          </Text>
        ) : content.length > 5000 ? (
          <>
            <Text maxW="50em">
              {content.substring(0, 5000)}
              <ExpandButton />
            </Text>
          </>
        ) : (
          <Text maxW="50em">
            {content}
          </Text>
        )
      }
    </Box>
  );
}
