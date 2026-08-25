const SUPABASE_URL = "https://ghlomcrgxkvequombpni.supabase.co";
const SUPABASE_KEY = "sb_publishable_WNWXz8z0_sOyiQRvkKiQPQ_XYIMo0Mq";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const senderName = document.getElementById("senderName");
const recipientName = document.getElementById("recipientName");
const occasion = document.getElementById("occasion");
const specialDate = document.getElementById("specialDate");
const message = document.getElementById("message");
const theme = document.getElementById("theme");

const previewTitle = document.getElementById("previewTitle");
const previewName = document.getElementById("previewName");
const previewDate = document.getElementById("previewDate");
const previewMessage = document.getElementById("previewMessage");

const previewBtn = document.getElementById("previewBtn");
const preview = document.getElementById("preview");


function updatePreview() {

    // Name
    previewName.textContent =
        recipientName.value.trim() || "Your Special Person";


    // Occasion
    const selectedOccasion = occasion.value;

    if (selectedOccasion === "Birthday") {

        previewTitle.textContent =
            "Happy Birthday 🎂";

    } else if (selectedOccasion === "Anniversary") {

        previewTitle.textContent =
            "Happy Anniversary ❤️";

    } else if (selectedOccasion === "Love") {

        previewTitle.textContent =
            "A Special Surprise For You 💚";

    } else if (selectedOccasion === "Friendship") {

        previewTitle.textContent =
            "For A Special Friend 🤝";

    } else {

        previewTitle.textContent =
            "A Special Surprise ✨";
    }


    // Date
    if (specialDate.value) {

        const date = new Date(specialDate.value);

        previewDate.textContent =
            date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

    } else {

        previewDate.textContent =
            "Your special date";
    }


    // Message
    previewMessage.textContent =
        message.value.trim() ||
        "Your special message will appear here...";


    // Theme

    if (theme.value === "green") {

        preview.style.background =
            "radial-gradient(circle at top, #124d31, #030303 70%)";

        preview.style.borderColor =
            "rgba(0,255,136,.3)";

    }

    else if (theme.value === "blue") {

        preview.style.background =
            "radial-gradient(circle at top, #123c6b, #030303 70%)";

        preview.style.borderColor =
            "rgba(0,150,255,.3)";

    }

    else if (theme.value === "pink") {

        preview.style.background =
            "radial-gradient(circle at top, #68143d, #030303 70%)";

        preview.style.borderColor =
            "rgba(255,70,150,.3)";

    }

    else if (theme.value === "purple") {

        preview.style.background =
            "radial-gradient(circle at top, #421568, #030303 70%)";

        preview.style.borderColor =
            "rgba(180,80,255,.3)";
    }

}


// Update when button is pressed
previewBtn.addEventListener("click", updatePreview);


// Also update automatically while typing
senderName.addEventListener("input", updatePreview);
recipientName.addEventListener("input", updatePreview);
message.addEventListener("input", updatePreview);
specialDate.addEventListener("change", updatePreview);
occasion.addEventListener("change", updatePreview);
theme.addEventListener("change", updatePreview);


// Initial preview
updatePreview();
const generateBtn = document.getElementById("generateBtn");
const generatedLink = document.getElementById("generatedLink");

generateBtn.addEventListener("click", async () => {

    generateBtn.disabled = true;
    generateBtn.textContent = "Creating...";

    const slug =
        Math.random().toString(36).substring(2, 10);

    const { data, error } = await supabaseClient
        .from("surprises")
        .insert([
            {
                sender_name: senderName.value.trim(),
                recipient_name: recipientName.value.trim(),
                occasion: occasion.value,
                special_date: specialDate.value || null,
                message: message.value.trim(),
                theme: theme.value,
                slug: slug
            }
        ])
        .select()
        .single();

    if (error) {

        console.error(error);

        generatedLink.textContent =
            "❌ Something went wrong. Please try again.";

        generateBtn.disabled = false;
        generateBtn.textContent =
            "🔗 Generate Surprise Link";

        return;
    }

    const link =
        window.location.origin +
        window.location.pathname +
        "?surprise=" +
        data.slug;

    generatedLink.innerHTML = `
        🎉 Your surprise is ready!<br><br>
        <a href="${link}" target="_blank">${link}</a>
    `;

    generateBtn.textContent = "✅ Link Generated";

});
