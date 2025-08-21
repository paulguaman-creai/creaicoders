export default function Footer() {
  return (
    <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
      <p>
        <a 
          href="https://jsonplaceholder.typicode.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ver documentación completa de JSONPlaceholder →
        </a>
      </p>
    </div>
  );
}
