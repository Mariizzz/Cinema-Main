import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    badge: 'DESTAQUE DA SEMANA',
    titulo: 'Homem-Aranha no Aranhaverso',
    imagem: require('./imagens/spiderman.jpg'),
  },
  {
    id: '2',
    badge: 'ESTREIA EM IMAX',
    titulo: 'Duna: Parte Três',
    imagem: require('./imagens/dunabanner.jpg'),
  },
  {
    id: '3',
    badge: 'SESSÃO ESPECIAL',
    titulo: 'Harry Potter e as Relíquias da Morte',
    imagem: require('./imagens/harrybanner.jpg'),
  },
];

const FILMES = [
  {
    id: '1',
    titulo: 'Pecadores',
    genero: 'Suspense • 2 horas e 17 min',
    formato: 'IMAX',
    imagem: require('./imagens/michaeljordan.png'),
  },
  {
    id: '2',
    titulo: 'Duna: Parte Três',
    genero: 'Ficção científica/Aventura • 2 horas e 20 min',
    formato: '2D',
    imagem: require('./imagens/duna3.jpg'),
  },
  {
    id: '3',
    titulo: 'Garfield: Fora de Casa',
    genero: 'Comédia • 1 hora e 40 min',
    formato: '3D',
    imagem: require('./imagens/gatinho.jpg'),
  },
  {
    id: '4',
    titulo: 'Resident Evil',
    genero: 'Terror/Ficção científica • 1 hora e 37 min',
    formato: '2D',
    imagem: require('./imagens/reve.png'),
  },
  {
    id: '5',
    titulo: 'Orgulho e Preconceito',
    genero: 'Romance • 2 horas e 9 min',
    formato: 'IMAX',
    imagem: require('./imagens/oep.jpg'),
  },
  {
    id: '6',
    titulo: 'Nós',
    genero: 'Terror/Mistério • 1 hora e 56 min',
    formato: '3D',
    imagem: require('./imagens/ussss.jpg'),
  },
  {
    id: '7',
    titulo: 'O Diabo Veste Prada',
    genero: 'Comédia • 1 hora e 59 min',
    formato: '2D',
    imagem: require('./imagens/odvp.png'),
  },
  {
    id: '8',
    titulo: 'Harry Potter e as Relíquias da Morte: Parte 1',
    genero: 'Aventura • 2 horas e 26 min',
    formato: 'IMAX',
    imagem: require('./imagens/harryyy.jpg'),
  },
];

export default function App() {
  const [slideAtivo, setSlideAtivo] = useState(0);
  const [filtro, setFiltro] = useState('Todos');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const filmesFiltrados =
    filtro === 'Todos'
      ? FILMES
      : FILMES.filter((f) => f.formato === '2D' || f.formato === '3D');

  const handleScrollSlider = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setSlideAtivo(index);
  };

  const handleCadastro = () => {
    if (!nome || !email) {
      Alert.alert('Atenção', 'Preencha nome e e-mail para continuar.');
      return;
    }
    Alert.alert('Sucesso', `Conta criada para ${nome}!`);
    setModalVisivel(false);
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            La La <Text style={styles.logoDestaque}>Cine</Text>
          </Text>
          <View style={styles.nav}>
            <TouchableOpacity>
              <Text style={[styles.navLink, styles.navActive]}>Cartaz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisivel(true)}>
              <Text style={styles.navLink}>Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Ingressos', 'Tela de ingressos')}>
              <Text style={styles.navLink}>Ingressos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO SLIDER */}
        <View style={styles.sliderWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollSlider}
          >
            {SLIDES.map((slide) => (
              <ImageBackground
                key={slide.id}
                source={slide.imagem}
                style={styles.heroSlide}
              >
                <View style={styles.heroOverlay}>
                  <Text style={styles.badgePremiere}>{slide.badge}</Text>
                  <Text style={styles.heroTitle}>{slide.titulo}</Text>
                  <View style={styles.heroButtons}>
                    <TouchableOpacity
                      style={styles.btnPlay}
                      onPress={() => Alert.alert('Ingresso', `Comprando: ${slide.titulo}`)}
                    >
                      <Text style={styles.btnText}>Comprar Ingresso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnInfo}>
                      <Text style={styles.btnText}>Ver Sessões</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>

          {/* BOLINHAS DO SLIDER */}
          <View style={styles.sliderDots}>
            {SLIDES.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, slideAtivo === idx && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* SEÇÃO EM CARTAZ */}
        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Em Cartaz nos Cinemas</Text>
            <View style={styles.filterTabs}>
              <TouchableOpacity
                style={[styles.tab, filtro === 'Todos' && styles.tabActive]}
                onPress={() => setFiltro('Todos')}
              >
                <Text style={styles.tabText}>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, filtro === '2D / 3D' && styles.tabActive]}
                onPress={() => setFiltro('2D / 3D')}
              >
                <Text style={styles.tabText}>2D / 3D</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* GRADE DE FILMES */}
          <View style={styles.movieGrid}>
            {filmesFiltrados.map((filme) => (
              <View key={filme.id} style={styles.movieCard}>
                <View style={styles.posterContainer}>
                  <Image source={filme.imagem} style={styles.poster} />
                  <View style={styles.badgeFormat}>
                    <Text style={styles.badgeFormatText}>{filme.formato}</Text>
                  </View>
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle} numberOfLines={1}>
                    {filme.titulo}
                  </Text>
                  <Text style={styles.genre} numberOfLines={2}>
                    {filme.genero}
                  </Text>
                  <TouchableOpacity
                    style={styles.btnTicket}
                    onPress={() => Alert.alert('Ingresso', `Filme: ${filme.titulo}`)}
                  >
                    <Text style={styles.btnTicketText}>Comprar Ingresso</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Todos os direitos reservados</Text>
        </View>
      </ScrollView>

      {/* MODAL DE CADASTRO */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Criar Conta</Text>
            <Text style={styles.modalSubtitle}>
              Cadastre-se no <Text style={styles.logoDestaque}>La La Cine</Text> para garantir seus ingressos
            </Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Crie uma senha"
              placeholderTextColor="#888"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.btnSubmit} onPress={handleCadastro}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141414',
  },
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0d0d0d',
  },
  logo: {
