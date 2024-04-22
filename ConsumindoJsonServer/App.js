import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

const App = () => {
  const [produtoId, setProdutoId] = useState('');
  const [produtoEncontrado, setProdutoEncontrado] = useState(null);
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const buscarProduto = async () => {
    try {
      const response = await axios.get(`http://192.168.1.5:3000/produtos/${produtoId}`);
      if (response.data) {
        setProdutoEncontrado(response.data);
        setErro('');
        setModalVisible(true); // Mostrar o modal quando o produto for encontrado
      } else {
        setProdutoEncontrado(null);
        setErro('Nenhum produto encontrado com o ID informado.');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setProdutoEncontrado(null);
      setErro('Erro ao buscar o produto. Verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Produto por ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o ID do produto"
        value={produtoId}
        onChangeText={text => setProdutoId(text)}
        keyboardType="numeric"
      />
      <Button
        title="Buscar"
        onPress={buscarProduto}
      />
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      
      {/* Modal para exibir os detalhes do produto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.produtoContainer}>
            <Text style={styles.nome}>{produtoEncontrado?.nome}</Text>
            <Text style={styles.descricao}>{produtoEncontrado?.descricao}</Text>
            <Text style={styles.preco}>Preço: R${produtoEncontrado?.preco.toFixed(2)}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  produtoContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    marginBottom: 5,
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default App;
