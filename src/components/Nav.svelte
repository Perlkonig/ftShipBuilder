<script lang="ts">
    let modalAbout: string;
    let modalFeedback: string;
</script>

<nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
        <a href={"#"} role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a href={"#"} class="navbar-item" on:click="{() => modalAbout = "is-active"}">
                About
            </a>

            <a href={"#"} class="navbar-item" on:click="{() => modalFeedback = "is-active"}">
                Feedback
            </a>
        </div>
    </div>
</nav>

<div class="modal {modalAbout}" id="modalAbout">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">About</p>
        </header>
        <section class="modal-card-body">
            <div class="content">
                <p>
                    This builder follows the <a href="https://emeraldcoastskunkworks.wordpress.com/category/project-continum-rules/"><i>Continuum</i> ruleset</a>. But the rules are not wholly unambiguous. Some tweaks have been made. See the "Feedback" tab for information on how to report issues.
                </p>
                <ul>
                    <li>Gunboats are not supported at all, and I don't know they ever will be.</li>
                    <li>Regenerative armour is currently unavailable, but I'm working on it.</li>
                    <li>Turrets are implemented, but the rules are not clear, so I had to make some calls. You can have multiple arcs open on a turret, but they must be contiguous. Weapons have to be manually placed inside the turret graphic. Lines are drawn to help you.</li>
                </ul>
                <p>
                    This site is built on the <a href="https://svelte.dev/">Svelte framework</a>, using the <a href="https://bulma.io">Bulma CSS library</a> and good ol' <a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics">scalable vector graphics (SVG)</a> for the SSD.
                </p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" on:click="{() => modalAbout = undefined}">Close</button>
        </footer>
    </div>
</div>

<div class="modal {modalFeedback}" id="modalFeedback">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Feedback</p>
        </header>
        <section class="modal-card-body">
            <div class="content">
                <p>
                    This project is open source. You can view and contribute to the code <a href="https://github.com/Perlkonig/ftShipBuilder">on GitHub</a>. Pull requests are warmly welcomed, as are issue reports.
                </p>
                <p>
                    I also hang out at the <a href="https://discord.gg/fXC3grNN9C">Full Thrust Gamers Discord server</a>.
                </p>
                <p>
                    I believe in the "value for value" model. If you find this tool valuable, consider a donation proportional to that value: <a href="https://paypal.me/abstractplay">paypal.me/abstractplay</a>. Thank you!
                  </p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" on:click="{() => modalFeedback = undefined}">Close</button>
        </footer>
    </div>
</div>

<style>
    .modal {
        z-index: 200;
    }
</style>