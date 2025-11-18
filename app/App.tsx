import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import HomePage from "src/pages/HomePage";

/**
 * Root application component.
 * Sets up font loading, safe area context, and renders the home page.
 */

export default function App() {
    useFonts({
        NanumMyeongjo: require("./assets/fonts/NanumMyeongjo-Regular.ttf"),
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <HomePage />
                {/* <CategoryGrid /> */}
                <StatusBar style="auto" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
