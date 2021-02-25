import React from "react";
import { View } from "remax/wechat";

import Schedule from "@/components/Schedule";
import styles from "./index.css";

export default () => {
  return (
    <View className={styles.body}>
      <Schedule />
    </View>
  );
};
