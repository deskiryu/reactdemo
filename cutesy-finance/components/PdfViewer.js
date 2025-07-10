import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function PdfViewerModal({ visible, onClose, base64 }) {
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.modalBg}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          {/* {base64 ? (
            <PdfViewer
              document={{ base64String: base64 }}
              enableAnnotation={false}
              enableFormFields={false}
              toolbarEnabled={false}
              style={styles.viewer}
            />
          ) : null} */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  viewer: {
    flex: 1,
  },
});
