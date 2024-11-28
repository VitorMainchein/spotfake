import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const playlists = [
    { id: '1', title: 'Funk Hits', cover: 'https://i.scdn.co/image/ab67706f000000021c420650f3c787e9bbcaa95d' },
    { id: '2', title: 'Trap Brasileiro', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848c84e8f98043164441f5f32c' },
    { id: '3', title: 'Funk 2024', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c5441477c00810e2eae9864a7' },
    { id: '4', title: 'Trap 101', cover: 'https://i.scdn.co/image/ab67616d0000b2732720421d972444171768c2d6' },
    { id: '5', title: 'Funk do Rio', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8409191c64e20a7f1bcfca56e6' },
  ];

  const recentlyPlayed = [
    { id: '6', title: 'Lets Go 5', cover: 'https://i.scdn.co/image/ab67616d00001e02db20916e7afa9e7c3025b6b1' },
    { id: '7', title: 'Terapia', cover: 'https://i.scdn.co/image/ab67616d0000b27330221d7fa0f07da1198dad93' },
    { id: '8', title: 'Fernando de Noronha', cover: 'https://cdn-images.dzcdn.net/images/cover/2c5215c670952bb3879d0a790b7a9fc8/0x1900-000000-80-0-0.jpg' },
    { id: '9', title: 'Noite Carioca', cover: 'https://cdn-images.dzcdn.net/images/cover/5c04758d86aefac7b7e4d7b615744ace/0x1900-000000-80-0-0.jpg' },
    { id: '10', title: 'Passar de Foguetão', cover: 'https://i.scdn.co/image/ab67616d0000b273772902a9ecae8bb9033706c1' },
  ];

  const songs = [
    {
      id: '1',
      title: 'Lets Go 5',
      artist: 'Mc Ryan SP, Dj Guuga',
      cover: 'https://i.scdn.co/image/ab67616d00001e02db20916e7afa9e7c3025b6b1',
      duration: '2:30',
    },
    {
      id: '2',
      title: 'Terapia',
      artist: 'Igor Guilherme, Mc Don Juan',
      cover: 'https://i.scdn.co/image/ab67616d0000b27330221d7fa0f07da1198dad93',
      duration: '3:15',
    },
  ];

  const openMusicCard = (music) => {
    setSelectedMusic(music);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMusic(null);
    setModalVisible(false);
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity onPress={() => openMusicCard({ ...item, artist: 'Artista Desconhecido', duration: '3:45' })}>
      <View style={styles.playlistItem}>
        <Image source={{ uri: item.cover }} style={styles.playlistImage} />
        <Text style={styles.playlistTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="settings-outline" size={28} color="#00bcd4" />
        </TouchableOpacity>
        <Text style={styles.greeting}>Spotfake</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out-outline" size={28} color="#00bcd4" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Tocadas Recentemente</Text>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Playlists Populares</Text>
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </ScrollView>

      {/* Modal to Show Music Card */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            {selectedMusic && (
              <>
                <Image source={{ uri: selectedMusic.cover }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{selectedMusic.title}</Text>
                <Text style={styles.cardArtist}>{selectedMusic.artist}</Text>
                <View style={styles.controls}>
                  <Ionicons name="play-back" size={28} color="#fff" />
                  <Ionicons name="play" size={36} color="#00bcd4" />
                  <Ionicons name="play-forward" size={28} color="#fff" />
                </View>
                <Text style={styles.duration}>{selectedMusic.duration}</Text>
              </>
            )}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#121212',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  playlistItem: {
    marginRight: 16,
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 8,
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardArtist: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
  },
  duration: {
    color: '#aaa',
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#00bcd4',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
