import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const generateData = (start, end) => {
  const data = [];
  for (let i = start; i <= end; i++) {
    data.push({ id: i.toString(), value: `Item ${i}` });
  }
  return data;
};

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10000000; // Number of items to load per page

  useEffect(() => {
    loadMoreData();
  }, [page]);

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);
    const newData = generateData((page - 1) * pageSize + 1, page * pageSize);
    setData(prevData => [...prevData, ...newData]);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.value}</Text>
    </View>
  );

  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
