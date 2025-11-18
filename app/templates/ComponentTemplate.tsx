import { StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
    layoutStyle?: ViewStyle;
};

export default function c0mp03nT({ layoutStyle }: Props) {
    return <View style={[layoutStyle, styles.container]}></View>;
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
    },
});
