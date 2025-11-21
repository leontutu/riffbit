import { ActivityIndicator, StyleSheet, View } from "react-native";

/**
 * Displays a loading state while questions are being fetched.
 * Currently minimal; will be enhanced with styling and animations in the future.
 */

export default function LoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={100} color="pink" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
