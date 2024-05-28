import { useState } from "react";
import { Container, SimpleGrid, Box, Image, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";

const books = [
  { id: 1, title: "Book 1", image: "https://images.unsplash.com/photo-1536237880829-dd441c249e0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxfGVufDB8fHx8MTcxNjkzNTEwM3ww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 1." },
  { id: 2, title: "Book 2", image: "https://images.unsplash.com/photo-1466695108335-44674aa2058b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyfGVufDB8fHx8MTcxNjkzNTEwM3ww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 2." },
  // Add more books here
  { id: 3, title: "Book 3", image: "https://images.unsplash.com/photo-1466695108335-44674aa2058b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAzfGVufDB8fHx8MTcxNjkzNTEwM3ww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 3." },
  { id: 4, title: "Book 4", image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjA0fGVufDB8fHx8MTcxNjkzNTEwNHww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 4." },
  { id: 5, title: "Book 5", image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjA1fGVufDB8fHx8MTcxNjkzNTEwNHww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 5." },
  { id: 6, title: "Book 6", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjA2fGVufDB8fHx8MTcxNjkzNTEwNXww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 6." },
  { id: 7, title: "Book 7", image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjA3fGVufDB8fHx8MTcxNjkzNTEwNXww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 7." },
  { id: 8, title: "Book 8", image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjA4fGVufDB8fHx8MTcxNjkzNTEwNXww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 8." },
  { id: 9, title: "Book 9", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjA5fGVufDB8fHx8MTcxNjkzNTEwNnww&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 9." },
  { id: 10, title: "Book 10", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxMHxlbnwwfHx8fDE3MTY5MzUxMDZ8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 10." },
  { id: 11, title: "Book 11", image: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxMXxlbnwwfHx8fDE3MTY5MzUxMDd8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 11." },
  { id: 12, title: "Book 12", image: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxMnxlbnwwfHx8fDE3MTY5MzUxMDd8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 12." },
  { id: 13, title: "Book 13", image: "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxM3xlbnwwfHx8fDE3MTY5MzUxMDd8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 13." },
  { id: 14, title: "Book 14", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxNHxlbnwwfHx8fDE3MTY5MzUxMDh8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 14." },
  { id: 15, title: "Book 15", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxNXxlbnwwfHx8fDE3MTY5MzUxMDh8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 15." },
  { id: 16, title: "Book 16", image: "https://images.unsplash.com/photo-1537806817607-45d08e8291bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxNnxlbnwwfHx8fDE3MTY5MzUxMDl8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 16." },
  { id: 17, title: "Book 17", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxN3xlbnwwfHx8fDE3MTY5MzUxMDl8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 17." },
  { id: 18, title: "Book 18", image: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxOHxlbnwwfHx8fDE3MTY5MzUxMDl8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 18." },
  { id: 19, title: "Book 19", image: "https://images.unsplash.com/photo-1472068996216-8c972a0af9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAxOXxlbnwwfHx8fDE3MTY5MzUxMTB8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 19." },
  { id: 20, title: "Book 20", image: "https://images.unsplash.com/photo-1615413833480-6e8427dbcc5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyMHxlbnwwfHx8fDE3MTY5MzUxMTB8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 20." },
  { id: 21, title: "Book 21", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyMXxlbnwwfHx8fDE3MTY5MzUxMTF8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 21." },
  { id: 22, title: "Book 22", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyMnxlbnwwfHx8fDE3MTY5MzUxMTF8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 22." },
  { id: 23, title: "Book 23", image: "https://images.unsplash.com/photo-1499652848871-1527a310b13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyM3xlbnwwfHx8fDE3MTY5MzUxMTJ8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 23." },
  { id: 24, title: "Book 24", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyNHxlbnwwfHx8fDE3MTY5MzUxMTJ8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 24." },
  { id: 25, title: "Book 25", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyNXxlbnwwfHx8fDE3MTY5MzUxMTN8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 25." },
  { id: 26, title: "Book 26", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyNnxlbnwwfHx8fDE3MTY5MzUxMTN8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 26." },
  { id: 27, title: "Book 27", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyN3xlbnwwfHx8fDE3MTY5MzUxMTR8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 27." },
  { id: 28, title: "Book 28", image: "https://images.unsplash.com/photo-1532975313331-cbaf920cf049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyOHxlbnwwfHx8fDE3MTY5MzUxMTR8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 28." },
  { id: 29, title: "Book 29", image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAyOXxlbnwwfHx8fDE3MTY5MzUxMTV8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 29." },
  { id: 30, title: "Book 30", image: "https://images.unsplash.com/photo-1501644898242-cfea317d7faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjAzMHxlbnwwfHx8fDE3MTY5MzUxMTV8MA&ixlib=rb-4.0.3&q=80&w=1080", story: "This is the story of Book 30." },
];

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    onOpen();
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={4} mb={10}>
        <Text fontSize="4xl" fontWeight="bold">
          Book Collection
        </Text>
        <Text fontSize="lg">Explore our collection of amazing books. Click on a book to read its story.</Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
        {books.map((book) => (
          <Box key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => handleBookClick(book)} cursor="pointer">
            <Image src={book.image} alt={book.title} />
            <Box p={6}>
              <Text fontSize="xl" fontWeight="bold">
                {book.title}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedBook?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedBook?.story}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
