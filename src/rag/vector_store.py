import chromadb
from chromadb.utils import embedding_functions


class AMLVectorStore:

    def __init__(self, persist_directory="chroma_db"):

        # Persistent client
        self.client = chromadb.Client(
            settings=chromadb.config.Settings(
                persist_directory=persist_directory,
                anonymized_telemetry=False
            )
        )

        # Embedding model (downloads once, cached)
        self.embedding_function = embedding_functions.DefaultEmbeddingFunction()

        # Create or load collection
        self.collection = self.client.get_or_create_collection(
            name="aml_regulations",
            embedding_function=self.embedding_function
        )

        # Auto-initialize if empty
        existing_ids = self.collection.get()["ids"]

        if not existing_ids:
            self._initialize_documents()

    def _initialize_documents(self):
        """
        Populate base AML regulatory documents.
        Only runs if collection is empty.
        """

        docs = [
            "Layering involves rapid movement of funds to obscure origin, often using foreign transfers.",
            "Structuring refers to breaking large transactions into smaller amounts to avoid reporting thresholds.",
            "Placement involves introducing funds into the financial system through cash deposits.",
            "Rapid transaction velocity may indicate suspicious layering behavior."
        ]

        ids = [f"doc_{i}" for i in range(len(docs))]

        self.collection.add(
            documents=docs,
            ids=ids
        )

    def query(self, query_text: str, n_results=2):
        """
        Retrieve top relevant regulatory snippets.
        """

        results = self.collection.query(
            query_texts=[query_text],
            n_results=n_results
        )

        if results and results["documents"]:
            return results["documents"][0]

        return []
