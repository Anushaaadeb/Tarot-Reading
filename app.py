import random

import streamlit as st

st.set_page_config(page_title="Tarot Reading", page_icon="🔮", layout="centered")

# (name, numeral, symbol, upright meaning, reversed meaning)
CARDS = [
    ("The Fool", "0", "🌱", "A fresh start. Trust your instincts and take the leap, even if the path is unclear.", "Hesitation or recklessness. Pause and look before you leap."),
    ("The Magician", "I", "✨", "You have the skills and resources you need. Focus your will and act.", "Scattered energy or untapped potential. Check that your plans match your actions."),
    ("The High Priestess", "II", "🌙", "Listen to your intuition. Answers come through quiet reflection.", "Ignoring your inner voice, or hidden confusion. Slow down and look inward."),
    ("The Empress", "III", "🌹", "Nurture, creativity and abundance. Care for yourself and what you are growing.", "Neglecting yourself or smothering others. Rebuild balance and creative flow."),
    ("The Emperor", "IV", "👑", "Structure, discipline and leadership. Build solid foundations.", "Rigidity or lack of control. Loosen your grip, or take back responsibility."),
    ("The Hierophant", "V", "📜", "Tradition, learning and guidance. A mentor or an established path helps.", "Questioning the rules. Find your own way of believing and doing."),
    ("The Lovers", "VI", "💞", "Meaningful connection and choices that match your values.", "Misalignment or a hard choice. Revisit what you truly value."),
    ("The Chariot", "VII", "🐎", "Determination and momentum. Steer competing forces toward one goal.", "Lost direction or control. Regroup before pushing forward."),
    ("Strength", "VIII", "🦁", "Quiet courage and patience. Gentle persistence wins.", "Self-doubt or drained confidence. Rebuild your inner strength."),
    ("The Hermit", "IX", "🕯️", "Solitude and reflection. Step back to find your own light.", "Isolation, or avoiding reflection. Reconnect with others, or with yourself."),
    ("Wheel of Fortune", "X", "🎡", "Cycles and change. Luck turns, so stay adaptable.", "Resisting change or bad timing. It is a phase, not a verdict."),
    ("Justice", "XI", "⚖️", "Fairness, truth and accountability. Choices have consequences.", "Unfairness or dodging responsibility. Look honestly at your part."),
    ("The Hanged Man", "XII", "🙃", "Pause and see differently. Let go of control to gain perspective.", "Stalling or needless sacrifice. Decide what is worth waiting for."),
    ("Death", "XIII", "🦋", "An ending that clears space. Let go to allow transformation.", "Clinging to what is over. Change is waiting for your permission."),
    ("Temperance", "XIV", "🏺", "Balance, patience and moderation. Blend opposites with care.", "Imbalance or excess. Find your middle ground again."),
    ("The Devil", "XV", "⛓️", "Attachments and habits that bind. Notice what holds you; you can loosen it.", "Breaking free. You are reclaiming your power from unhealthy patterns."),
    ("The Tower", "XVI", "⚡", "Sudden upheaval that clears false foundations. Rebuild stronger.", "Avoiding a needed change, or a slow collapse. Face it early."),
    ("The Star", "XVII", "⭐", "Hope, healing and renewal. Keep faith in the long term.", "Discouragement or lost faith. Small acts of self-care restart hope."),
    ("The Moon", "XVIII", "🌕", "Uncertainty and intuition. Things are not yet what they seem.", "Confusion lifting. Fears fade as the truth emerges."),
    ("The Sun", "XIX", "☀️", "Joy, clarity and success. Enjoy what is going well.", "Dimmed optimism. Success is delayed, not denied."),
    ("Judgement", "XX", "📯", "Awakening and self-evaluation. Answer the call to change.", "Self-doubt or avoiding reflection. Forgive yourself and move on."),
    ("The World", "XXI", "🌍", "Completion and wholeness. A cycle closes with achievement.", "Unfinished business. Complete the final steps."),
]
SPREADS = {
    "One card: a quick answer": ["Your card"],
    "Three cards: past, present, future": ["Past", "Present", "Future"],
    "Five cards: the full picture": ["Situation", "Challenge", "Advice", "Strength", "Outcome"],
}

st.markdown("""
<style>
.card {border: 2px solid #c9a227; border-radius: 14px; padding: 14px 6px; text-align: center;
       background: #1e1633; min-height: 230px;}
.pos {color: #c9a227; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;}
.num {color: #b9a9e0; font-size: 15px; margin-top: 6px;}
.sym {font-size: 46px; margin: 8px 0;}
.name {font-weight: 600; font-size: 16px;}
.orient {font-size: 12px; color: #b9a9e0; margin-top: 6px;}
.flip {display: inline-block; transform: rotate(180deg);}
</style>
""", unsafe_allow_html=True)

st.title("🔮 Tarot Reading")
st.caption("Pick a spread, think of a question, and draw your cards. For reflection and fun.")

question = st.text_input("Your question (optional)", placeholder="What should I focus on this month?")
spread_name = st.selectbox("Choose a spread", list(SPREADS))
positions = SPREADS[spread_name]

if st.button("🃏 Draw cards", type="primary"):
    picks = random.sample(range(len(CARDS)), len(positions))
    st.session_state["draw"] = (spread_name, [(i, random.random() < 0.5) for i in picks])

draw = st.session_state.get("draw")
if not draw or draw[0] != spread_name:
    st.info("Press **Draw cards** to begin.")
    st.stop()

cards = draw[1]
if question:
    st.subheader(f"“{question}”")

cols = st.columns(len(positions))
for col, pos, (i, rev) in zip(cols, positions, cards):
    name, num, sym, _, _ = CARDS[i]
    sym_html = f'<span class="flip">{sym}</span>' if rev else sym
    col.markdown(
        f'<div class="card"><div class="pos">{pos}</div><div class="num">{num}</div>'
        f'<div class="sym">{sym_html}</div><div class="name">{name}</div>'
        f'<div class="orient">{"Reversed" if rev else "Upright"}</div></div>',
        unsafe_allow_html=True,
    )

st.subheader("Your reading")
lines = []
for pos, (i, rev) in zip(positions, cards):
    name, _, sym, up, down = CARDS[i]
    meaning = down if rev else up
    st.markdown(f"**{pos}: {name} ({'Reversed' if rev else 'Upright'})**  \n{meaning}")
    lines.append(f"{pos}: {name} ({'Reversed' if rev else 'Upright'}) - {meaning}")

n_rev = sum(r for _, r in cards)
st.caption(f"{len(cards) - n_rev} upright and {n_rev} reversed. Reversed cards point to blocked or inward energy, not bad luck.")
st.download_button("⬇️ Download reading", f"{question}\n\n" + "\n".join(lines), "tarot_reading.txt")
