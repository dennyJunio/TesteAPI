<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM filmes");
    $stmt->execute();
    $filmes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($filmes);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $diretor = $_POST['diretor'];
    $ano_lancamento = $_POST['ano_lancamento'];
    $genero = $_POST['genero'];

    $stmt = $conn->prepare("INSERT INTO filmes(titulo, diretor, ano_lancamento, genero) VALUES(:titulo, :diretor, :ano_lancamento, :genero)");
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':diretor', $diretor);
    $stmt->bindParam(':ano_lancamento', $ano_lancamento);
    $stmt->bindParam(':genero', $genero);

    if ($stmt->execute()) {
        echo "Filme criado com sucesso!";
    } else {
        echo "Erro ao criar filme!";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM filmes WHERE id = :id");
    $stmt->bindParam(":id", $id);

    if ($stmt->execute()) {
        echo "Filme excluido com sucesso!!!";
    } else {
        echo "Erro ao excluir filme";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novoTitulo = $_PUT['titulo'];
    $novodiretor = $_PUT['diretor'];
    $novoAno = $_PUT['ano_lancamento'];
    $novoGenero = $_PUT['genero'];

    $stmt = $conn->prepare("UPDATE filmes SET titulo = :titulo, diretor = :diretor, ano_lancamento = :ano_lancamento, genero = :genero  WHERE id = :id");
    $stmt->bindParam(':titulo', $novoTitulo);
    $stmt->bindParam(':diretor', $novodiretor);
    $stmt->bindParam(':ano_lancamento', $novoAno);
    $stmt->bindParam(':genero', $novoGenero);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo "Filme atualizando!!";
    } else {
        echo "Erro ao att Filme";
    }
}
