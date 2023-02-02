function mainPageLayout() {
    const parentOfMainLayout = document.createElement("div");

    parentOfMainLayout.innerHTML = `
    <main>
        <section class="py-5 text-center container">
            <div class="row py-lg-5 header-main">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Train & Play</h1>
                </div>
                <div>
                    <a href="#" class="btn">PLAY</a>
                </div>
                
            </div>
        </section>
        
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"></div>
            </div>
        </div>
    </main>
    `;

    document.body.append(parentOfMainLayout);
}

export default mainPageLayout;