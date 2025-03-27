"use strict";
(self.webpackChunk = self.webpackChunk || []).push([
  [2954],
  {
    82954: (e, s, a) => {
      a.r(s), a.d(s, { default: () => f });
      var n = a(63696),
        r = a(81660),
        i = a(19211),
        o = a(99101),
        l = a(84129),
        t = a(8427),
        d = a(22187),
        c = a(68872),
        h = a(50977),
        m = a(80249),
        u = (a(72446), a(5908)),
        p = a(19650),
        g = a(27397),
        x = a(99304),
        j = a(62540);
      function b(e, s, a) {
        return (
          s in e
            ? Object.defineProperty(e, s, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[s] = a),
          e
        );
      }
      class v extends n.Component {
        constructor(e) {
          super(e),
            b(this, "handleChange", (e) => {
              const { name: s, value: a } = e.target;
              this.setState({
                formValaues: { ...this.state.formValaues, [s]: a },
              });
            }),
            b(this, "onSubmit", (e) => {
              e.preventDefault(),
                fetch("http://localhost:9083/signup/customer")
                  .then((e) => e.json())
                  .then((e) => {
                    console.log(e);
                  }),
                this.formValidate() &&
                  this.props.actions.signup(this.state.formValaues);
            }),
            b(this, "formValidate", () => {
              let e = this.state.formValaues,
                s = this.state.formErrors,
                a = !1;
              return (
                e.name
                  ? (s.name = null)
                  : ((s.name = "Name is required."), (a = !0)),
                e.mobile
                  ? (s.mobile = null)
                  : ((s.mobile = "Mobile # is required."), (a = !0)),
                e.password
                  ? (s.password = null)
                  : ((s.password = "Password # is required."), (a = !0)),
                this.setState({ formErrors: s }),
                !a
              );
            }),
            (this.state = {
              signupErr: this.props.signupErr,
              isLoggedIn: this.props.isLoggedIn,
              formValaues: { name: "", email: "", mobile: "", password: "" },
              formErrors: {
                name: null,
                email: null,
                mobile: null,
                password: null,
              },
            });
        }
        componentDidMount() {
          this.state.isLoggedIn &&
            setTimeout(() => {
              this.props.navigate("/");
            });
        }
        static getDerivedStateFromProps(e, s) {
          let a = {};
          return (
            e.auth !== s.auth && (a.auth = e.auth),
            e.isLoggedIn !== s.isLoggedIn && (a.isLoggedIn = e.isLoggedIn),
            e.signupErr !== s.signupErr && (a.signupErr = e.signupErr),
            a
          );
        }
        componentDidUpdate(e) {
          !e.isLoggedIn &&
            this.state.isLoggedIn &&
            (g.oR.success("Signup Successfully!"), this.props.navigate("/"));
        }
        render() {
          const { signupErr: e, formValaues: s, formErrors: a } = this.state;
          return (0, j.jsx)("div", {
            className: "login-wrapper p-0",
            children: (0, j.jsx)(r.A, {
              children: (0, j.jsxs)(i.A, {
                className: "justify-content-center mb-5",
                children: [
                  (0, j.jsx)(o.A, {
                    xs: 12,
                    md: 4,
                    className: "d-none d-sm-block ",
                    children: (0, j.jsxs)("div", {
                      className: "login-image",
                      children: [
                        (0, j.jsxs)("span", {
                          className: "login-pro-inner rounded",
                          children: [
                            " ",
                            (0, j.jsx)("img", {
                              src: c.A,
                              className: "login-profile",
                              alt: "",
                            }),
                          ],
                        }),
                        (0, j.jsxs)("div", {
                          className: "login-header",
                          children: [
                            (0, j.jsx)("h5", { children: "Mission" }),
                            (0, j.jsxs)("p", {
                              children: [
                                "Ratnavihar is especially known as a wholesaler.Ratnavihar has a distinct identity in the world of Diamond Jewellery, Gemstones and Rudraksha, which is providing its service in many cities in India.",
                                " ",
                              ],
                            }),
                            (0, j.jsx)("p", {
                              children:
                                "The company has achieved a good footing of growth in a few years. We have endeavoured to provide seamless convenience to our customers, prices displayed are Cash on Delivery and our 100% refund policy is highly appreciated. We continuously strive to expand and make our service more convenient than ever before.",
                            }),
                            (0, j.jsx)("p", {
                              children:
                                "My goal is to connect with every small and big city to reach the right things at the right price.",
                            }),
                            (0, j.jsxs)("p", {
                              children: [
                                " ",
                                "Your suggestion can be helpful for us, we look forward to your suggestion. We are committed to quality and loyalty to our customers.",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, j.jsx)(o.A, {
                    xs: 12,
                    md: 5,
                    children: (0, j.jsxs)("div", {
                      className: "login-form-wrapper",
                      children: [
                        (0, j.jsx)("h2", {
                          className: "text-center text-danger",
                          children: "SignUp",
                        }),
                        (0, j.jsx)("hr", {}),
                        e
                          ? (0, j.jsx)(l.A, { variant: "danger", children: e })
                          : null,
                        (0, j.jsxs)("form", {
                          onSubmit: this.onSubmit,
                          children: [
                            (0, j.jsxs)("div", {
                              className: "row align-items-baseline",
                              children: [
                                (0, j.jsxs)(t.A.Group, {
                                  className: "mb-3  col",
                                  controlId: "formEmailAddress",
                                  children: [
                                    (0, j.jsx)(t.A.Label, { children: "Name" }),
                                    (0, j.jsx)(t.A.Control, {
                                      className: "rounded",
                                      name: "name",
                                      onChange: (e) => this.handleChange(e),
                                      value: s.name,
                                      type: "text",
                                      placeholder: "Enter your name",
                                    }),
                                    (0, j.jsxs)("span", {
                                      type: "invalid",
                                      style: { color: "red" },
                                      children: [" ", a.name, " "],
                                    }),
                                  ],
                                }),
                                (0, j.jsxs)(t.A.Group, {
                                  className: "mb-2 col",
                                  controlId: "formBasicPassword",
                                  children: [
                                    (0, j.jsx)(t.A.Label, {
                                      children: "Email",
                                    }),
                                    (0, j.jsx)(t.A.Control, {
                                      className: "rounded",
                                      name: "email",
                                      onChange: (e) => this.handleChange(e),
                                      value: s.email,
                                      type: "email",
                                      placeholder: "Enter your Email",
                                    }),
                                    (0, j.jsxs)("span", {
                                      type: "invalid",
                                      style: { color: "red" },
                                      children: [" ", a.email, " "],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, j.jsxs)(t.A.Group, {
                              className: "mb-3",
                              controlId: "formEmailAddress",
                              children: [
                                (0, j.jsx)(t.A.Label, { children: "Mobile" }),
                                (0, j.jsx)(t.A.Control, {
                                  className: "rounded",
                                  name: "mobile",
                                  onChange: (e) => this.handleChange(e),
                                  value: s.mobile,
                                  type: "text",
                                  placeholder: "Enter Mobile Number",
                                }),
                                (0, j.jsxs)("span", {
                                  type: "invalid",
                                  style: { color: "red" },
                                  children: [" ", a.mobile, " "],
                                }),
                              ],
                            }),
                            (0, j.jsxs)(t.A.Group, {
                              className: "mb-2",
                              controlId: "formBasicPassword",
                              children: [
                                (0, j.jsx)(t.A.Label, { children: "Password" }),
                                (0, j.jsx)(t.A.Control, {
                                  className: "rounded",
                                  name: "password",
                                  onChange: (e) => this.handleChange(e),
                                  value: s.password,
                                  type: "password",
                                  placeholder: "Enter Password",
                                  autoComplete: "new-password",
                                }),
                                (0, j.jsxs)("span", {
                                  type: "invalid",
                                  style: { color: "red" },
                                  children: [" ", a.password, " "],
                                }),
                              ],
                            }),
                            (0, j.jsx)("div", {
                              className: "signup-policy-wrapper",
                              children: (0, j.jsxs)(t.A.Group, {
                                className: "mt-2 d-flex",
                                controlId: "formBasicCheckbox",
                                children: [
                                  (0, j.jsx)(t.A.Check, {
                                    type: "checkbox",
                                    label: "",
                                  }),
                                  (0, j.jsxs)("span", {
                                    children: [
                                      "I accept Prakriti",
                                      " ",
                                      (0, j.jsxs)("a", {
                                        href: "/terms-condition",
                                        target: "_blank",
                                        children: [
                                          " ",
                                          "Terms of Service",
                                          " ",
                                        ],
                                      }),
                                      " ",
                                      "and",
                                      " ",
                                      (0, j.jsxs)("a", {
                                        href: "/privacy-policy",
                                        target: "_blank",
                                        children: [" ", "Privacy Policy"],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, j.jsx)("div", {
                              className: "login-button mb-3 mt-3",
                              children: (0, j.jsx)(d.A, {
                                variant: "primary",
                                type: "submit",
                                className: "rounded ",
                                children: "SIGNUP",
                              }),
                            }),
                            (0, j.jsxs)("p", {
                              className: "login-text mt-2 mb-2",
                              children: [
                                "Already Have an Account? ",
                                (0, j.jsx)("a", {
                                  href: "/login",
                                  children: "Login",
                                }),
                              ],
                            }),
                            (0, j.jsx)("hr", {}),
                          ],
                        }),
                        (0, j.jsx)("div", {
                          className: "login-button-mob mb-4 mt-0",
                          children: (0, j.jsx)(d.A, {
                            variant: "primary rounded",
                            children: "CREATE ACCOUNT",
                          }),
                        }),
                        (0, j.jsxs)("div", {
                          className: "login-footer-button",
                          children: [
                            (0, j.jsxs)(d.A, {
                              variant: "primary",
                              className: "email-btn rounded",
                              href: "",
                              children: [
                                (0, j.jsx)("i", { class: "bi bi-google me-2" }),
                                " SIGNUP WITH GOOGLE",
                              ],
                            }),
                            (0, j.jsxs)(d.A, {
                              variant: "primary",
                              className: "fb-btn rounded",
                              href: "",
                              children: [
                                (0, j.jsx)(x.ok6, {}),
                                "   SIGNUP WITH FACEBOOK",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          });
        }
      }
      const f = (0, h.A)(
        (0, m.Ng)(
          (e) => ({
            auth: e.auth,
            isLoggedIn: "isLoggedIn" in e.auth && e.auth.isLoggedIn,
            signupErr: "signupErr" in e.auth ? e.auth.signupErr : "",
          }),
          (e) => ({ actions: (0, u.zH)({ signup: p.$5 }, e) })
        )(v)
      );
    },
    68872: (e, s, a) => {
      a.d(s, { A: () => n });
      const n = a.p + "assets/login.png";
    },
    84129: (e, s, a) => {
      a.d(s, { A: () => f });
      var n = a(71633),
        r = a.n(n),
        i = a(63696),
        o = a(61898),
        l = a(54803),
        t = a(35191),
        d = a(71971),
        c = a(14977),
        h = a(17327),
        m = a(297),
        u = a(89161),
        p = a(62540);
      const g = (0, m.A)("h4");
      g.displayName = "DivStyledAsH4";
      const x = (0, u.A)("alert-heading", { Component: g }),
        j = (0, u.A)("alert-link", { Component: t.A }),
        b = {
          variant: "primary",
          show: !0,
          transition: c.A,
          closeLabel: "Close alert",
        },
        v = i.forwardRef((e, s) => {
          const {
              bsPrefix: a,
              show: n,
              closeLabel: i,
              closeVariant: t,
              className: m,
              children: u,
              variant: g,
              onClose: x,
              dismissible: j,
              transition: b,
              ...v
            } = (0, o.Zw)(e, { show: "onClose" }),
            f = (0, d.oU)(a, "alert"),
            y = (0, l.A)((e) => {
              x && x(!1, e);
            }),
            A = !0 === b ? c.A : b,
            N = (0, p.jsxs)("div", {
              role: "alert",
              ...(A ? void 0 : v),
              ref: s,
              className: r()(m, f, g && `${f}-${g}`, j && `${f}-dismissible`),
              children: [
                j &&
                  (0, p.jsx)(h.A, { onClick: y, "aria-label": i, variant: t }),
                u,
              ],
            });
          return A
            ? (0, p.jsx)(A, {
                unmountOnExit: !0,
                ...v,
                ref: void 0,
                in: n,
                children: N,
              })
            : n
            ? N
            : null;
        });
      (v.displayName = "Alert"), (v.defaultProps = b);
      const f = Object.assign(v, { Link: j, Heading: x });
    },
  },
]);
