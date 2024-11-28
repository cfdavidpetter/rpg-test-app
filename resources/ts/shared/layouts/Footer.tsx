export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="p-4 bg-gray-50 sm:p-6">
        <div className="mx-auto md:container">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="flex items-center justify-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © {currentYear} <a href="https://usenextbase.com" className="hover:underline">PRG</a>. Teste Desenvolvedor PHP Senior.
                </span>
            </div>
        </div>
    </footer>
    );
}