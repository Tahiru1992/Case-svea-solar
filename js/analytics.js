// dataLayer hjälpfunktion
function pushToDataLayer(event, data) {
    window.dataLayer.push({
        event: event,
        ...data,
        timestamp: new Date().toISOString()
    });
    
    // Logga till konsolen i demonstrationssyfte
    console.log('dataLayer Push:', {
        event: event,
        ...data,
        timestamp: new Date().toISOString()
    });
}

// Sidvisningsspårning
document.addEventListener('DOMContentLoaded', function() {
    pushToDataLayer('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
    
    // Spåra navigationsklick
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Förhindra faktisk navigering för demo
            
            pushToDataLayer('navigation_click', {
                link_id: this.id,
                link_text: this.textContent,
                link_url: this.href
            });
        });
    });
    
    // Spåra CTA-knappklick
    document.getElementById('cta-button').addEventListener('click', function() {
        pushToDataLayer('cta_click', {
            button_id: 'cta-button',
            button_text: this.textContent
        });
    });
    
    // Spåra produktinteraktioner
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            
            pushToDataLayer('add_to_cart', {
                product_id: product.dataset.productId,
                product_name: product.dataset.productName,
                product_price: parseFloat(product.dataset.productPrice),
                currency: 'SEK'
            });
        });
    });
});

<script>
        window.dataLayer = window.dataLayer || [];
        
        function simpleHash(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash = hash & hash;
            }
            return hash;
        }

        function handleSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const email = form.email.value;
            const name = form.name.value;
            
            window.dataLayer.push({
                'event': 'form_submission',
                'user_data': {
                    'email_hashed': simpleHash(email),
                    'name': name
                }
            });
            console.log('Form data pushed to dataLayer');
        }
    </script>

// Exempel på hur man kommer åt dataLayer-data
window.showDataLayerHistory = function() {
    console.table(window.dataLayer);
};