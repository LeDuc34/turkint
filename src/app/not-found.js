'use client';
import Header from ".//headerDisconnected";

export default function NotFound() {
    return (
        <div>
            <Header/>
            <img src="ranc.png" className="py-24"></img>
            <footer className="fixed bottom-0 bg-red-600 shadow mt-2 w-full">
        <div className="container mx-auto py-4 px-4 text-center">
          <p className="text-gray-100">&copy; 2024 Turkint. Tous droits réservés.</p>
        </div>
      </footer>
        </div>
    );
}