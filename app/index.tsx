import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Divider,
  IconButton,
  List,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { ProdutoModel } from '@/models/produto.model';
import { FlatList, View } from 'react-native';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [produtos, setProdutos] = useState<ProdutoModel[]>([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [product, setProduct] = useState('');
  const onDismissSnackBar = () => setProduct('');

  async function setup() {
    const produtos = await db.getAllAsync<ProdutoModel>(
      'SELECT * FROM produto'
    );

    setProdutos(produtos);

    const produto = produtos.find(({ quantidade }) => quantidade! < 5);
    if (produto) setProduct(produto.nome!);
  }

  async function newProduct() {
    const produto = await db.getFirstAsync<ProdutoModel>(
      'SELECT * FROM produto WHERE nome = ?',
      nome
    );

    if (produto) {
      await db.runAsync(
        'UPDATE produto SET quantidade = ?, preco = ? WHERE id = ?',
        +quantidade,
        +preco,
        produto.id!
      );
    } else
      await db.runAsync(
        'INSERT INTO produto (nome, quantidade, preco) VALUES (?, ?, ?)',
        nome,
        +quantidade,
        +preco
      );

    await setup();
  }

  async function removeProduct(id: number) {
    await db.getFirstAsync<ProdutoModel>(
      'DELETE FROM produto WHERE id = ?',
      id
    );

    await setup();
  }

  useEffect(() => {
    setup();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 16 }}>
      <View style={{ flex: 1 }}>
        <Text variant="displaySmall">Produtos</Text>
        <FlatList
          data={produtos}
          renderItem={({ item }) => {
            const { nome, quantidade, preco, id } = item;
            const formatedPreco = preco?.toFixed(2);
            const [inteiro, decimal] = formatedPreco!.split('.');

            return (
              <List.Item
                onPress={() => {
                  setNome(nome!);
                  setQuantidade(`${quantidade}`);
                  setPreco(`${preco}`);
                }}
                title={`${quantidade} ${nome}${quantidade! > 1 ? 's' : ''}`}
                description={`R$ ${inteiro},${decimal}`}
                left={(props) => <List.Icon {...props} icon="shopping" />}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="delete"
                    onPress={() => removeProduct(+id!)}
                  />
                )}
              />
            );
          }}
        />
      </View>
      <Divider />
      <View style={{ gap: 16 }}>
        <Text variant="displaySmall">Novo Produto</Text>
        <TextInput
          mode="outlined"
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          mode="outlined"
          label="Quantidade"
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
          keyboardType="number-pad"
        />
        <TextInput
          mode="outlined"
          label="Preço"
          value={preco}
          onChangeText={(text) => setPreco(text)}
          keyboardType="number-pad"
        />
      </View>
      <Button mode="elevated" onPress={() => newProduct()}>
        <Text style={{ color: 'black' }}>Novo Produto</Text>
      </Button>
      <Snackbar visible={!!product} onDismiss={onDismissSnackBar}>
        <Text style={{ color: 'white' }}>
          Poucas {product.toLowerCase()}s em estoque
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
}
