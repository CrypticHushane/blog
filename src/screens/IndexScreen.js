import React, { useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPost } = useContext(Context);

    useEffect(() => {
        getBlogPost();
        const listener = navigation.addListener("didFocus", () => {
            getBlogPost();
        });

        return () => {
            listener.remove();
        };
    }, []);
    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Show", { id: item.id })
                            }
                        >
                            <View style={styles.blogContainer}>
                                <View style={styles.column}>
                                    <Text style={styles.title}>
                                        Title: {item.title}{" "}
                                    </Text>
                                    <Text style={styles.title}>
                                        {" "}
                                        Content: {item.content}{" "}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => deleteBlogPost(item.id)}
                                >
                                    <Feather name="trash" size={25} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    blogContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        borderBottomWidth: 0.5,
        paddingVertical: 20,
        borderBottomColor: "gray",
    },
    title: {
        fontSize: 18,
    },
    column: {
        flexDirection: "column",
    },
});

export default IndexScreen;
