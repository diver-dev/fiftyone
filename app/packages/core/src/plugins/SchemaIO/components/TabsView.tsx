import { HelpTooltip } from "@fiftyone/components";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useKey } from "../hooks";
import { getComponentProps } from "../utils";
import HeaderView from "./HeaderView";
import RoundedTabs from "./RoundedTabs";

export default function TabsView(props) {
  const { onChange, path, schema, data } = props;
  const { view = {}, default: defaultValue } = schema;
  const { choices = [], variant = "default" } = view;
  const [tab, setTab] = useState(data ?? (defaultValue || choices[0]?.value));
  const [_, setUserChanged] = useKey(path, schema, data, true);

  useEffect(() => {
    if (typeof onChange === "function") onChange(path, tab);
  }, [tab]);

  return (
    <Box {...getComponentProps(props, "container")}>
      <HeaderView {...props} nested />
      {variant === "rounded" && (
        <RoundedTabs
          tabs={choices.map((choice) => ({ id: choice.value, ...choice }))}
          selected={tab}
          onChange={setTab}
        />
      )}
      {variant !== "rounded" && (
        <Tabs
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={(e, value) => {
            setTab(value);
            setUserChanged();
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
          {...getComponentProps(props, "tabs")}
        >
          {choices.map(({ value, label, description }) => (
            <Tab
              key={value}
              label={label}
              value={value}
              icon={description && <HelpTooltip title={description} />}
              iconPosition="end"
              sx={{ minHeight: 48 }}
              {...getComponentProps(props, "tab")}
            />
          ))}
        </Tabs>
      )}
    </Box>
  );
}
