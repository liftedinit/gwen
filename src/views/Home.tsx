import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { RiArrowLeftRightLine, RiCoinLine, RiUserLine } from "react-icons/ri";
import { Stat } from "features/dashboard";

const stats = [
  { label: "Number of Accounts", value: "520", icon: RiUserLine },
  { label: "Ledger Symbols", value: "2", icon: RiCoinLine },
  { label: "Transactions", value: "40,350", icon: RiArrowLeftRightLine },
];

const data = {
  options: {
    xaxis: {
      categories: [
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
      ],
    },
    colors: ["#38C7B4"],
    chart: { toolbar: { show: false } },
  },
  series: [
    {
      name: "BTC",
      data: [
        1, 350, 1242, 340, 450, 1290, 7600, 6200, 10599, 19850, 66974, 20700,
      ],
    },
  ],
};

export function Home() {
  return (
    <Box p={6}>
      <Heading size="sm" mb={6}>
        Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "5", md: "6" }}>
        {stats.map(({ label, value, icon }) => (
          <Stat key={label} label={label} value={value} icon={icon} />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={2} gap="6" mt={6}>
        <Box bg="white">
          <Chart type="bar" series={data.series} options={data.options} />
        </Box>
        <Box bg="white">
          <Chart type="line" series={data.series} options={data.options} />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
