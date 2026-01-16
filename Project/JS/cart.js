/* Bestandsnaam: cart.js */

// 1. Haal de huidige winkelmand op uit het geheugen van de browser
let cart = JSON.parse(localStorage.getItem("tailwind_cart")) || [];

// 2. Update de teller in de navigatiebalk (wordt op elke pagina uitgevoerd)
function updateCartCount() {
    const countLabel = document.getElementById("cart-count");
    if (countLabel) {
        countLabel.innerText = cart.length;
    }
}

// 3. Functie: Voeg item toe (Wordt aangeroepen door de knop op aanbod.html)
function addToCart(name, price) {
    // Voeg nieuw item toe aan de lijst
    cart.push({ id: Date.now(), name: name, price: price });
    
    // Sla de nieuwe lijst direct op in de browser
    localStorage.setItem("tailwind_cart", JSON.stringify(cart));
    
    // Update de teller direct
    updateCartCount();
    
    // Geef feedback aan de gebruiker
    alert(name + " is succesvol toegevoegd aan uw mand!");
}

// 4. Functie: Verwijder item (Wordt gebruikt op winkelmand.html)
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("tailwind_cart", JSON.stringify(cart));
    
    // Als we op de winkelmand pagina zijn, herlaad de pagina om de tabel te verversen
    if (window.location.href.includes("winkelmand.html")) {
        location.reload();
    } else {
        updateCartCount();
    }
}

// 5. Functie: Leeg de hele mand
function clearCart() {
    if(confirm("Wilt u de winkelmand volledig legen?")) {
        localStorage.removeItem("tailwind_cart");
        cart = [];
        if (window.location.href.includes("winkelmand.html")) {
            location.reload();
        } else {
            updateCartCount();
        }
    }
}

// 6. Start de teller zodra de pagina geladen is
document.addEventListener("DOMContentLoaded", updateCartCount);